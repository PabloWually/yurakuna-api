import type { Role } from '@shared/types';
import { SignJWT, jwtVerify } from 'jose';

const textEncoder = new TextEncoder();

const JWT_SECRET = textEncoder.encode(
  process.env.JWT_SECRET || 'default-secret-key-change-in-production'
);

const JWT_REFRESH_SECRET = textEncoder.encode(
  process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-key-change-in-production'
);

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
const WORKERS_MAX_PBKDF2_ITERATIONS = 100000;
const parsedPasswordHashIterations = Number(process.env.PASSWORD_HASH_ITERATIONS ?? '100000');
const PASSWORD_HASH_ITERATIONS =
  Number.isInteger(parsedPasswordHashIterations) && parsedPasswordHashIterations > 0
    ? Math.min(parsedPasswordHashIterations, WORKERS_MAX_PBKDF2_ITERATIONS)
    : WORKERS_MAX_PBKDF2_ITERATIONS;
const PASSWORD_HASH_LENGTH = 32;

export interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
}

export interface RefreshTokenPayload {
  userId: string;
  tokenId: string;
}

function parseTimeToSeconds(time: string): number {
  const unit = time.slice(-1);
  const value = parseInt(time.slice(0, -1));

  switch (unit) {
    case 's':
      return value;
    case 'm':
      return value * 60;
    case 'h':
      return value * 60 * 60;
    case 'd':
      return value * 24 * 60 * 60;
    default:
      return 900; // default 15 minutes
  }
}

function toBase64(bytes: Uint8Array): string {
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function derivePasswordHash(password: string, salt: Uint8Array, iterations: number) {
  const saltBuffer = salt.buffer as ArrayBuffer;

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: saltBuffer,
      iterations,
    },
    keyMaterial,
    PASSWORD_HASH_LENGTH * 8
  );

  return new Uint8Array(derivedBits);
}

function timingSafeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < left.length; index += 1) {
    result |= left[index]! ^ right[index]!;
  }

  return result === 0;
}

export async function generateAccessToken(payload: TokenPayload): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);

  return token;
}

export async function generateRefreshToken(payload: RefreshTokenPayload): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_REFRESH_EXPIRES_IN)
    .sign(JWT_REFRESH_SECRET);

  return token;
}

export async function verifyAccessToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch (error) {
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
    return payload as unknown as RefreshTokenPayload;
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivePasswordHash(password, salt, PASSWORD_HASH_ITERATIONS);

  return ['pbkdf2', PASSWORD_HASH_ITERATIONS, toBase64(salt), toBase64(hash)].join('$');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [algorithm, iterationsValue, saltValue, hashValue] = hash.split('$');

  if (algorithm !== 'pbkdf2' || !iterationsValue || !saltValue || !hashValue) {
    return false;
  }

  const iterations = Number(iterationsValue);

  if (
    !Number.isInteger(iterations) ||
    iterations <= 0 ||
    iterations > WORKERS_MAX_PBKDF2_ITERATIONS
  ) {
    return false;
  }

  const salt = fromBase64(saltValue);
  const expectedHash = fromBase64(hashValue);
  let actualHash: Uint8Array;

  try {
    actualHash = await derivePasswordHash(password, salt, iterations);
  } catch {
    return false;
  }

  return timingSafeEqual(actualHash, expectedHash);
}

export function getRefreshTokenExpiration(): Date {
  const seconds = parseTimeToSeconds(JWT_REFRESH_EXPIRES_IN);
  return new Date(Date.now() + seconds * 1000);
}
