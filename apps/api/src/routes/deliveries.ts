import { deliveryManager } from "@api/core/libs/delivery";
import { createDeliverySchema, updateDeliverySchema } from "@api/core/types/delivery";
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

export default app;
