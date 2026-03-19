import { productManager } from "@api/core/libs/product";
import { createProductSchema, updateProductSchema } from "@api/core/types/product";
import { Criteria } from "@api/core/types/shared";
import { authMiddleware, requirePermission } from "@api/middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono();

app.get(
  "/:id",
  authMiddleware,
  requirePermission("products:read"),
  async (c) => {
    const id = c.req.param("id");
    const result = await productManager.findProduct.findById(id);
    return c.json(result);
  },
);

app.post(
  "/",
  authMiddleware,
  requirePermission("products:create"),
  zValidator("json", createProductSchema),
  async (c) => {
    const data = c.req.valid("json");
    const product = await productManager.createProduct.create(data);
    return c.json(product, 201);
  },
);

app.post(
  "/list",
  authMiddleware,
  requirePermission("products:read"),
  zValidator("json", Criteria),
  async (c) => {
    const criteria = c.req.valid("json");
    const result = await productManager.searchProduct.search(criteria);
    return c.json(result);
  },
);

app.patch(
  "/:id",
  authMiddleware,
  requirePermission("products:update"),
  zValidator("json", updateProductSchema),
  async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const product = await productManager.updateProduct.update(id, data);
    return c.json(product);
  },
);

app.delete("/:id", authMiddleware, requirePermission("products:delete"), async (c) => {
  const id = c.req.param("id");
  await productManager.deleteProduct.delete(id);
  return c.json({ message: "Producto eliminado exitosamente" });
});

export default app;
