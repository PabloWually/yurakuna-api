import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { errorHandler } from "./src/middleware/errorHandler";
import auth from "./src/routes/auth";
import products from "./src/routes/products";
import users from "./src/routes/users";
import stock from "./src/routes/stock";
import deliveries from "./src/routes/deliveries";
import orders from "./src/routes/orders";
import clients from "./src/routes/clients";
import providers from "./src/routes/providers";
import purchases from "./src/routes/purchases";

const app = new Hono();
const defaultAllowedOrigin = "http://localhost:4200";
const allowedOrigins = (process.env.CORS_ORIGINS ?? defaultAllowedOrigin).split(",")

app.use('*', logger());
app.use(
  '*',
  cors({
    origin: allowedOrigins,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 86400,
  })
);
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
app.route('/api/users', users);
app.route('/api/stock', stock);
app.route('/api/deliveries', deliveries);
app.route('/api/orders', orders);
app.route('/api/clients', clients);
app.route('/api/providers', providers);
app.route('/api/purchases', purchases);

app.notFound((c) => {
  return c.json({ error: { code: 'NOT_FOUND', message: 'Ruta no encontrada' } }, 404);
});

export default app;
