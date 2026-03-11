import { AppError } from '@shared/errors';
import type { Context, Next } from 'hono';
import { ZodError } from 'zod';

export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    console.error('Error:', error);

    if (error instanceof AppError) {
      return c.json(
        {
          error: {
            code: error.code,
            message: error.message,
          },
        },
        error.statusCode as any
      );
    }

    if (error instanceof ZodError) {
      return c.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Errores de validación',
            details: error.issues,
          },
        },
        400
      );
    }

    return c.json(
      {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error interno del servidor',
        },
      },
      500
    );
  }
}
