import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas';

const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

function getPositiveIntegerEnv(name: string, fallback: number, maxValue?: number): number {
  const rawValue = process.env[name];

  if (!rawValue) {
    return fallback;
  }

  const parsedValue = Number(rawValue);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  if (typeof maxValue === 'number') {
    return Math.min(parsedValue, maxValue);
  }

  return parsedValue;
}

const DB_MAX_CONNECTIONS = getPositiveIntegerEnv('DB_MAX_CONNECTIONS', 1, 5);
const DB_IDLE_TIMEOUT_SECONDS = getPositiveIntegerEnv('DB_IDLE_TIMEOUT_SECONDS', 20, 60);
const DB_CONNECT_TIMEOUT_SECONDS = getPositiveIntegerEnv('DB_CONNECT_TIMEOUT_SECONDS', 10, 30);
const DB_MAX_LIFETIME_SECONDS = getPositiveIntegerEnv('DB_MAX_LIFETIME_SECONDS', 60 * 30);

const isSupabasePooler = /pooler\.supabase\.com/i.test(connectionString);
const usesTransactionPooler = /:6543(?:\/|\?|$)/.test(connectionString);

if (isSupabasePooler && !usesTransactionPooler) {
  console.warn(
    'DATABASE_URL apunta a Supabase pero no usa puerto 6543 (transaction pooler). Esto puede aumentar costos y errores por exceso de conexiones en serverless.'
  );
}

export const client = postgres(connectionString, {
  ssl: 'require',
  max: DB_MAX_CONNECTIONS,
  idle_timeout: DB_IDLE_TIMEOUT_SECONDS,
  connect_timeout: DB_CONNECT_TIMEOUT_SECONDS,
  max_lifetime: DB_MAX_LIFETIME_SECONDS,
  prepare: false,
  onnotice: () => {},
  connection: {
    application_name: 'yurakuna-api-worker',
  },
});
export const db = drizzle(client, { schema });

let databaseReadyPromise: Promise<void> | null = null;

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function pingDatabase(): Promise<void> {
  await client`select 1`;
}

async function initializeDatabase(): Promise<void> {
  const retryDelaysInMilliseconds = [0, 120, 300];
  let latestError: unknown;

  for (const [attemptIndex, delayInMilliseconds] of retryDelaysInMilliseconds.entries()) {
    try {
      if (delayInMilliseconds > 0) {
        await wait(delayInMilliseconds);
      }

      await pingDatabase();
      return;
    } catch (error) {
      latestError = error;

      if (attemptIndex === retryDelaysInMilliseconds.length - 1) {
        break;
      }
    }
  }

  throw latestError;
}

export async function ensureDatabaseReady(): Promise<void> {
  if (!databaseReadyPromise) {
    databaseReadyPromise = initializeDatabase();
  }

  try {
    await databaseReadyPromise;
  } catch (error) {
    databaseReadyPromise = null;
    throw error;
  }
}

export type Database = typeof db;
