import z from "zod";

export const createStockMovementSchema = z.object({
  productId: z.string().min(1, 'ID de producto requerido'),
  type: z.enum(['in', 'out', 'adjustment', 'shrinkage']),
  quantity: z.number().positive('La cantidad debe ser positiva'),
  reason: z.string().optional(),
});

export const createShrinkageSchema = z.object({
  productId: z.string().min(1, 'ID de producto requerido'),
  quantity: z.number().positive('La cantidad debe ser positiva'),
  cause: z.enum(['damaged', 'expired']),
  notes: z.string().optional(),
});
