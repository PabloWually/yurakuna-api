import z from "zod";

export const createDeliverySchema = z.object({
  orderId: z.string().min(1, 'ID de orden requerido'),
  clientId: z.string().min(1, 'ID de cliente requerido'),
  deliveryAddress: z.string().min(1, 'Dirección de entrega requerida'),
  notes: z.string().optional(),
});

export const updateDeliverySchema = z.object({
  status: z.enum(['pending', 'in_transit', 'completed', 'failed']).optional(),
  deliveredAt: z.coerce.date().optional(),
  notes: z.string().optional(),
});
