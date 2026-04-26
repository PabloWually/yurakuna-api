import z from 'zod';

export const createPurchaseItemSchema = z.object({
  productId: z.string().uuid('ID de producto inválido'),
  quantity: z.number().positive('La cantidad debe ser positiva'),
  pricePerUnit: z.number().positive('El precio debe ser positivo'),
});

export const createPurchaseSchema = z.object({
  providerId: z.string().uuid('ID de proveedor inválido'),
  createdById: z.string().uuid('ID de usuario inválido'),
  items: z.array(createPurchaseItemSchema).min(1, 'Debe haber al menos un item'),
});

export const updatePurchaseSchema = z.object({
  status: z.enum(['draft', 'confirmed', 'cancelled']).optional(),
});

export const updatePurchaseItemSchema = z.object({
  quantity: z.number().positive('La cantidad debe ser positiva'),
  pricePerUnit: z.number().positive('El precio debe ser positivo'),
});
