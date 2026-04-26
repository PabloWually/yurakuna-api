import { deliveryManager } from "@api/core/libs/delivery";
import { createDeliverySchema, updateDeliverySchema, updateDeliveryItemSchema, createDeliveryItemSchema } from "@api/core/types/delivery";
import { Criteria } from "@api/core/types/shared";
import { authMiddleware, requirePermission } from "@api/middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono();

app.get(
  "/:id",
  authMiddleware,
  requirePermission("deliveries:read"),
  async (c) => {
    const id = c.req.param("id");
    const result = await deliveryManager.findDelivery.findById(id);
    return c.json(result);
  },
);

app.post(
  "/",
  authMiddleware,
  requirePermission("deliveries:create"),
  zValidator("json", createDeliverySchema),
  async (c) => {
    const data = c.req.valid("json");
    const delivery = await deliveryManager.createDelivery.create(data);
    return c.json(delivery, 201);
  },
);

app.post(
  "/list",
  authMiddleware,
  requirePermission("deliveries:read"),
  zValidator("json", Criteria),
  async (c) => {
    const criteria = c.req.valid("json");
    const result = await deliveryManager.searchDelivery.search(criteria);
    return c.json(result);
  },
);

app.patch(
  "/:id",
  authMiddleware,
  requirePermission("deliveries:update"),
  zValidator("json", updateDeliverySchema),
  async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const delivery = await deliveryManager.updateDelivery.update(id, data);
    return c.json(delivery);
  },
);

app.delete("/:id", authMiddleware, requirePermission("deliveries:delete"), async (c) => {
  const id = c.req.param("id");
  await deliveryManager.deleteDelivery.delete(id);
  return c.json({ message: "Entrega eliminada exitosamente" });
});

// Item management endpoints
app.post(
  "/:id/items",
  authMiddleware,
  requirePermission("deliveries:update"),
  zValidator("json", createDeliveryItemSchema),
  async (c) => {
    const deliveryId = c.req.param("id");
    const data = c.req.valid("json");
    const item = await deliveryManager.addDeliveryItem.add(
      deliveryId,
      data.orderItemId,
      data.productId,
      data.quantity.toString(),
    );
    return c.json(item, 201);
  },
);

app.patch(
  "/:id/items/:itemId",
  authMiddleware,
  requirePermission("deliveries:update"),
  zValidator("json", updateDeliveryItemSchema),
  async (c) => {
    const deliveryId = c.req.param("id");
    const itemId = c.req.param("itemId");
    const data = c.req.valid("json");
    const item = await deliveryManager.updateDeliveryItem.update(deliveryId, itemId, data.quantity.toString());
    return c.json(item);
  },
);

app.delete(
  "/:id/items/:itemId",
  authMiddleware,
  requirePermission("deliveries:update"),
  async (c) => {
    const deliveryId = c.req.param("id");
    const itemId = c.req.param("itemId");
    await deliveryManager.deleteDeliveryItem.delete(deliveryId, itemId);
    return c.json({ message: "Item de entrega eliminado exitosamente" });
  },
);

export default app;
