import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { errorHandler } from "./src/middleware/errorHandler";
import auth from "./src/routes/auth";
import products from "./src/routes/products";

const app = new Hono();

app.use('*', logger());
app.use('*', cors());
app.use('*', errorHandler);

app.get('/', (c) => {
  return c.json({
    message: 'Yurakuna API - Sistema de gestión de productos (hortalizas)',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      orders: '/api/orders',
    },
  });
});

app.route('/api/auth', auth);
app.route('/api/products', products);

app.notFound((c) => {
  return c.json({ error: { code: 'NOT_FOUND', message: 'Ruta no encontrada' } }, 404);
});

const port = process.env.PORT || 3000;

console.log(`Server running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
