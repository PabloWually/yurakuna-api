import { stockManager } from "@api/core/libs/stock";
import { createStockMovementSchema, createShrinkageSchema } from "@api/core/types/stock";
import { Criteria } from "@api/core/types/shared";
import { authMiddleware, requirePermission } from "@api/middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono();

app.post(
  "/movements",
  authMiddleware,
  requirePermission("stock:create"),
  zValidator("json", createStockMovementSchema),
  async (c) => {
    const data = c.req.valid("json");
    const movement = await stockManager.cretateStockMovement.createMovement(data);
    return c.json(movement, 201);
  },
);

app.post(
  "/movements/list",
  authMiddleware,
  requirePermission("stock:read"),
  zValidator("json", Criteria),
  async (c) => {
    const criteria = c.req.valid("json");
    const result = await stockManager.listStockMovements.list(criteria);
    return c.json(result);
  },
);

app.post(
  "/shrinkage",
  authMiddleware,
  requirePermission("stock:create"),
  zValidator("json", createShrinkageSchema),
  async (c) => {
    const data = c.req.valid("json");
    const shrinkage = await stockManager.createStockShrinkage.createShrinkage(data);
    return c.json(shrinkage, 201);
  },
);

app.post(
  "/shrinkage/list",
  authMiddleware,
  requirePermission("stock:read"),
  zValidator("json", Criteria),
  async (c) => {
    const criteria = c.req.valid("json");
    const result = await stockManager.listStockShrinkage.list(criteria);
    return c.json(result);
  },
);

export default app;
