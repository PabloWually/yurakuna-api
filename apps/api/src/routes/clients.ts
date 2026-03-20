import { clientManager } from "@api/core/libs/client";
import { createClientSchema, updateClientSchema } from "@api/core/types/client";
import { Criteria } from "@api/core/types/shared";
import { authMiddleware, requirePermission } from "@api/middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono();

app.get(
  "/:id",
  authMiddleware,
  requirePermission("clients:read"),
  async (c) => {
    const id = c.req.param("id");
    const result = await clientManager.findClient.findById(id);
    return c.json(result);
  },
);

app.post(
  "/",
  authMiddleware,
  requirePermission("clients:create"),
  zValidator("json", createClientSchema),
  async (c) => {
    const data = c.req.valid("json");
    const client = await clientManager.createClient.create(data);
    return c.json(client, 201);
  },
);

app.post(
  "/list",
  authMiddleware,
  requirePermission("clients:read"),
  zValidator("json", Criteria),
  async (c) => {
    const criteria = c.req.valid("json");
    const result = await clientManager.searchClient.search(criteria);
    return c.json(result);
  },
);

app.patch(
  "/:id",
  authMiddleware,
  requirePermission("clients:update"),
  zValidator("json", updateClientSchema),
  async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const client = await clientManager.updateClient.update(id, data);
    return c.json(client);
  },
);

export default app;
