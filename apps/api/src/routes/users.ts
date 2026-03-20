import { userManager } from "@api/core/libs/user";
import { createUserSchema } from "@api/core/types/user";
import { authMiddleware, requirePermission } from "@api/middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono();

app.post(
  "/",
  authMiddleware,
  requirePermission("users:create"),
  zValidator("json", createUserSchema),
  async (c) => {
    const data = c.req.valid("json");
    const user = await userManager.registerUser.register(data);
    return c.json(user, 201);
  },
);

export default app;
