import { ForbiddenError, UnauthorizedError } from '@shared/errors';
import { verifyAccessToken, type TokenPayload } from '@shared/infrastructure/security/auth';
import type { Role } from '@shared/types';
import type { Context, Next } from 'hono';

declare module 'hono' {
  interface ContextVariableMap {
    user: TokenPayload;
  }
}

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Token no proporcionado');
  }

  const token = authHeader.substring(7);
  const payload = await verifyAccessToken(token);

  if (!payload) {
    throw new UnauthorizedError('Token inválido o expirado');
  }

  c.set('user', payload);
  await next();
}

export function requireRole(...roles: Role[]) {
  return async (c: Context, next: Next) => {
    const user = c.get('user');

    if (!user) {
      throw new UnauthorizedError('user no autenticado');
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenError('No tienes permisos para acceder a este recurso');
    }

    await next();
  };
}

// Permisos específicos por recurso
export const permissions = {
  // Productos
  'products:read': ['admin', 'user', 'client'],
  'products:create': ['admin', 'user'],
  'products:update': ['admin', 'user'],
  'products:delete': ['admin'],

  // clients
  'clients:read': ['admin', 'user'],
  'clients:create': ['admin', 'user'],
  'clients:update': ['admin', 'user'],
  'clients:delete': ['admin'],

  // Pedidos
  'orders:read': ['admin', 'user', 'client'],
  'orders:create': ['admin', 'user', 'client'],
  'orders:update': ['admin', 'user'],
  'orders:delete': ['admin'],

  // Stock
  'stock:read': ['admin', 'user'],
  'stock:create': ['admin', 'user'],

  // Entregas
  'deliveries:read': ['admin', 'user'],
  'deliveries:create': ['admin', 'user'],
  'deliveries:update': ['admin', 'user'],
  'deliveries:delete': ['admin'],

  // users
  'users:read': ['admin'],
  'users:create': ['admin'],
  'users:update': ['admin'],
  'users:delete': ['admin'],

  // Proveedores
  'providers:read': ['admin', 'user'],
  'providers:create': ['admin', 'user'],
  'providers:update': ['admin', 'user'],
  'providers:delete': ['admin'],

  // Compras
  'purchases:read': ['admin', 'user'],
  'purchases:create': ['admin', 'user'],
  'purchases:update': ['admin', 'user'],
  'purchases:delete': ['admin'],
} as const;

export type Permission = keyof typeof permissions;

export function requirePermission(permission: Permission) {
  return async (c: Context, next: Next) => {
    const user = c.get('user');

    if (!user) {
      throw new UnauthorizedError('user no autenticado');
    }

    const allowedRoles = permissions[permission];
    if (!allowedRoles.includes(user.role as any)) {
      throw new ForbiddenError('No tienes permisos para realizar esta acción');
    }

    await next();
  };
}
