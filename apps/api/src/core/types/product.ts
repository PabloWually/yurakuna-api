import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  description: z.string().optional(),
  unit: z.enum(['kg', 'unities', 'lb', 'g', 'liters']),
  pricePerUnit: z.number().positive('El precio debe ser positivo'),
  currentStock: z.number().nonnegative('El stock no puede ser negativo').optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  unit: z.enum(['kg', 'unities', 'lb', 'g', 'liters']).optional(),
  pricePerUnit: z.number().positive().optional(),
  currentStock: z.number().nonnegative().optional(),
});

export const adjustStockSchema = z.object({
  quantity: z.number(),
  reason: z.string().optional(),
});

export const paginationSchema = z.object({
  page: z.string().optional().default('1').transform(Number),
  limit: z.string().optional().default('10').transform(Number),
});
