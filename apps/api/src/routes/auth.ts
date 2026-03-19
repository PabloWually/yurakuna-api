import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { authMiddleware } from "@api/middleware/auth";
import { authManager } from "@api/core/libs/auth";
import { userManager } from "@api/core/libs/user";

const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

const registerSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  name: z.string().min(1, "Nombre requerido"),
  role: z.enum(["admin", "client", "user"]).optional(),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token requerido"),
});

const app = new Hono();

app.post("/login", zValidator("json", loginSchema), async (c) => {
  const data = c.req.valid("json");
  const result = await authManager.login.logIn(data);
  return c.json(result);
});

app.post("/register", zValidator("json", registerSchema), async (c) => {
  const data = c.req.valid("json");
  const result = await userManager.registerUser.register(data);
  return c.json(result, 201);
});

app.post("/refresh", zValidator("json", refreshTokenSchema), async (c) => {
  const { refreshToken } = c.req.valid("json");
  const result = await authManager.refreshAccessToken.refreshAccessToken(refreshToken);
  return c.json(result);
});

app.post(
  "/logout",
  authMiddleware,
  zValidator("json", refreshTokenSchema),
  async (c) => {
    const { refreshToken } = c.req.valid("json");
    await authManager.logout.logOut(refreshToken);
    return c.json({ message: "Sesión cerrada exitosamente" });
  },
);

app.post("/logout-all", authMiddleware, async (c) => {
  const user = c.get("user");
  await authManager.logout.logOutAll(user.userId);
  return c.json({ message: "Todas las sesiones cerradas exitosamente" });
});

export default app;
