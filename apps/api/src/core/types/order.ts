import z from "zod";

const createOrderItemSchema = z.object({
  productId: z.string().min(1, 'ID de producto requerido'),
  quantity: z.number().positive('La cantidad debe ser positiva'),
});

export const createOrderSchema = z.object({
  clientId: z.string().min(1, 'ID de cliente requerido'),
  createdById: z.string().min(1, 'ID de usuario requerido'),
  items: z.array(createOrderItemSchema).min(1, 'Debe haber al menos un item'),
});

export const updateOrderSchema = z.object({
  status: z.enum(['draft', 'confirmed', 'delivered', 'cancelled']).optional(),
});
