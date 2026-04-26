import z from "zod";

export const createDeliveryItemSchema = z.object({
  orderItemId: z.string().uuid('ID de item de orden inválido'),
  productId: z.string().uuid('ID de producto inválido'),
  quantity: z.number().positive('La cantidad debe ser mayor a 0'),
});

export const createDeliverySchema = z.object({
  orderId: z.string().min(1, 'ID de orden requerido'),
  clientId: z.string().min(1, 'ID de cliente requerido'),
  deliveryAddress: z.string().min(1, 'Dirección de entrega requerida'),
  notes: z.string().optional(),
  items: z.array(createDeliveryItemSchema).min(1, 'Se requiere al menos un item de entrega'),
});

export const updateDeliverySchema = z.object({
  status: z.enum(['pending', 'in_transit', 'completed', 'failed']).optional(),
  deliveredAt: z.coerce.date().optional(),
  notes: z.string().optional(),
});

export const updateDeliveryItemSchema = z.object({
  quantity: z.number().positive('La cantidad debe ser mayor a 0'),
});
