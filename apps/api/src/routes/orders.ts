import { orderManager } from "@api/core/libs/order";
import { createOrderSchema, updateOrderSchema, updateOrderItemSchema, createOrderItemSchema } from "@api/core/types/order";
import { Criteria } from "@api/core/types/shared";
import { authMiddleware, requirePermission } from "@api/middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono();

app.get(
  "/:id",
  authMiddleware,
  requirePermission("orders:read"),
  async (c) => {
    const id = c.req.param("id");
    const result = await orderManager.findOrder.findByIdWithItems(id);
    return c.json(result);
  },
);

app.post(
  "/",
  authMiddleware,
  requirePermission("orders:create"),
  zValidator("json", createOrderSchema),
  async (c) => {
    const data = c.req.valid("json");
    const order = await orderManager.createOrder.create(data);
    return c.json(order, 201);
  },
);

app.post(
  "/list",
  authMiddleware,
  requirePermission("orders:read"),
  zValidator("json", Criteria),
  async (c) => {
    const criteria = c.req.valid("json");
    const result = await orderManager.searchOrder.search(criteria);
    return c.json(result);
  },
);

app.patch(
  "/:id",
  authMiddleware,
  requirePermission("orders:update"),
  zValidator("json", updateOrderSchema),
  async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const order = await orderManager.updateOrder.update(id, data);
    return c.json(order);
  },
);

app.delete("/:id", authMiddleware, requirePermission("orders:delete"), async (c) => {
  const id = c.req.param("id");
  await orderManager.deleteOrder.delete(id);
  return c.json({ message: "Orden eliminada exitosamente" });
});

// Item management endpoints
app.post(
  "/:id/items",
  authMiddleware,
  requirePermission("orders:update"),
  zValidator("json", createOrderItemSchema),
  async (c) => {
    const orderId = c.req.param("id");
    const data = c.req.valid("json");
    const item = await orderManager.addOrderItem.add(orderId, data.productId, data.quantity.toString());
    return c.json(item, 201);
  },
);

app.patch(
  "/:id/items/:itemId",
  authMiddleware,
  requirePermission("orders:update"),
  zValidator("json", updateOrderItemSchema),
  async (c) => {
    const orderId = c.req.param("id");
    const itemId = c.req.param("itemId");
    const data = c.req.valid("json");
    const item = await orderManager.updateOrderItem.update(orderId, itemId, data.quantity.toString());
    return c.json(item);
  },
);

app.delete(
  "/:id/items/:itemId",
  authMiddleware,
  requirePermission("orders:update"),
  async (c) => {
    const orderId = c.req.param("id");
    const itemId = c.req.param("itemId");
    await orderManager.deleteOrderItem.delete(orderId, itemId);
    return c.json({ message: "Item de orden eliminado exitosamente" });
  },
);

export default app;
