// import { Hono } from 'hono';
// import { cors } from 'hono/cors';
// import { logger } from 'hono/logger';
//
// import { db } from './src/infrastructure/database/connection';
// import { errorHandler } from './src/presentation/middleware/errorHandler';
//
// // Repositories
// import { UserRepository } from './src/infrastructure/repositories/UserRepository';
// import { ProductRepository } from './src/infrastructure/repositories/ProductRepository';
// import { ClientRepository } from './src/infrastructure/repositories/ClientRepository';
// import { OrderRepository } from './src/infrastructure/repositories/OrderRepository';
// import { RefreshTokenRepository } from './src/infrastructure/repositories/RefreshTokenRepository';
//
// // Use Cases
// import { AuthUseCases } from './src/application/useCases/AuthUseCases';
// import { ProductUseCases } from './src/application/useCases/ProductUseCases';
// import { OrderUseCases } from './src/application/useCases/OrderUseCases';
//
// // Routes
// import { createAuthRoutes } from './src/presentation/routes/auth';
// import { createProductRoutes } from './src/presentation/routes/products';
// import { createOrderRoutes } from './src/presentation/routes/orders';
//
// const app = new Hono();
//
// // Middleware
// app.use('*', logger());
// app.use('*', cors());
// app.use('*', errorHandler);
//
// // Initialize repositories
// const userRepository = new UserRepository(db);
// const productRepository = new ProductRepository(db);
// const clientRepository = new ClientRepository(db);
// const orderRepository = new OrderRepository(db);
// const refreshTokenRepository = new RefreshTokenRepository(db);
//
// // Initialize use cases
// const authUseCases = new AuthUseCases(userRepository, refreshTokenRepository);
// const productUseCases = new ProductUseCases(productRepository);
// const orderUseCases = new OrderUseCases(orderRepository, productRepository);
//
// // Routes
// app.get('/', (c) => {
//   return c.json({
//     message: 'Yurakuna API - Sistema de gestión de productos (hortalizas)',
//     version: '1.0.0',
//     endpoints: {
//       auth: '/api/auth',
//       products: '/api/products',
//       orders: '/api/orders',
//     },
//   });
// });
//
// app.route('/api/auth', createAuthRoutes(authUseCases));
// app.route('/api/products', createProductRoutes(productUseCases));
// app.route('/api/orders', createOrderRoutes(orderUseCases));
//
// // 404 handler
// app.notFound((c) => {
//   return c.json({ error: { code: 'NOT_FOUND', message: 'Ruta no encontrada' } }, 404);
// });
//
// const port = process.env.PORT || 3000;
//
// console.log(`Server running on http://localhost:${port}`);
//
// export default {
//   port,
//   fetch: app.fetch,
// };
//

import app from './apps/api/app';
app
