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
      throw new UnauthorizedError('Usuario no autenticado');
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
  'products:read': ['administrador', 'usuario', 'cliente'],
  'products:create': ['administrador', 'usuario'],
  'products:update': ['administrador', 'usuario'],
  'products:delete': ['administrador'],

  // Clientes
  'clients:read': ['administrador', 'usuario'],
  'clients:create': ['administrador', 'usuario'],
  'clients:update': ['administrador', 'usuario'],
  'clients:delete': ['administrador'],

  // Pedidos
  'orders:read': ['administrador', 'usuario', 'cliente'],
  'orders:create': ['administrador', 'usuario', 'cliente'],
  'orders:update': ['administrador', 'usuario'],
  'orders:delete': ['administrador'],

  // Stock
  'stock:read': ['administrador', 'usuario'],
  'stock:create': ['administrador', 'usuario'],

  // Entregas
  'deliveries:read': ['administrador', 'usuario'],
  'deliveries:create': ['administrador', 'usuario'],
  'deliveries:update': ['administrador', 'usuario'],
  'deliveries:delete': ['administrador'],

  // Usuarios
  'users:read': ['administrador'],
  'users:create': ['administrador'],
  'users:update': ['administrador'],
  'users:delete': ['administrador'],
} as const;

export type Permission = keyof typeof permissions;

export function requirePermission(permission: Permission) {
  return async (c: Context, next: Next) => {
    const user = c.get('user');

    if (!user) {
      throw new UnauthorizedError('Usuario no autenticado');
    }

    const allowedRoles = permissions[permission];
    if (!allowedRoles.includes(user.role as any)) {
      throw new ForbiddenError('No tienes permisos para realizar esta acción');
    }

    await next();
  };
}
