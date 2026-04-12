import { purchaseManager } from '@api/core/libs/purchase';
import { createPurchaseSchema, updatePurchaseSchema } from '@api/core/types/purchase';
import { Criteria } from '@api/core/types/shared';
import { authMiddleware, requirePermission } from '@api/middleware/auth';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const app = new Hono();

app.get(
  '/:id',
  authMiddleware,
  requirePermission('purchases:read'),
  async (c) => {
    const id = c.req.param('id');
    const result = await purchaseManager.findPurchase.findByIdWithItems(id);
    return c.json(result);
  },
);

app.post(
  '/',
  authMiddleware,
  requirePermission('purchases:create'),
  zValidator('json', createPurchaseSchema),
  async (c) => {
    const data = c.req.valid('json');
    const purchase = await purchaseManager.createPurchase.create(data);
    return c.json(purchase, 201);
  },
);

app.post(
  '/list',
  authMiddleware,
  requirePermission('purchases:read'),
  zValidator('json', Criteria),
  async (c) => {
    const criteria = c.req.valid('json');
    const result = await purchaseManager.searchPurchase.search(criteria);
    return c.json(result);
  },
);

app.patch(
  '/:id',
  authMiddleware,
  requirePermission('purchases:update'),
  zValidator('json', updatePurchaseSchema),
  async (c) => {
    const id = c.req.param('id');
    const data = c.req.valid('json');
    const purchase = await purchaseManager.updatePurchase.update(id, data);
    return c.json(purchase);
  },
);

app.delete(
  '/:id',
  authMiddleware,
  requirePermission('purchases:delete'),
  async (c) => {
    const id = c.req.param('id');
    await purchaseManager.deletePurchase.delete(id);
    return c.json({ message: 'Compra eliminada exitosamente' });
  },
);

export default app;
