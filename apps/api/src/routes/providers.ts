import { providerManager } from '@api/core/libs/provider';
import { createProviderSchema, updateProviderSchema } from '@api/core/types/provider';
import { Criteria } from '@api/core/types/shared';
import { authMiddleware, requirePermission } from '@api/middleware/auth';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const app = new Hono();

app.get(
  '/:id',
  authMiddleware,
  requirePermission('providers:read'),
  async (c) => {
    const id = c.req.param('id');
    const result = await providerManager.findProvider.findById(id);
    return c.json(result);
  },
);

app.post(
  '/',
  authMiddleware,
  requirePermission('providers:create'),
  zValidator('json', createProviderSchema),
  async (c) => {
    const data = c.req.valid('json');
    const provider = await providerManager.createProvider.create(data);
    return c.json(provider, 201);
  },
);

app.post(
  '/list',
  authMiddleware,
  requirePermission('providers:read'),
  zValidator('json', Criteria),
  async (c) => {
    const criteria = c.req.valid('json');
    const result = await providerManager.searchProvider.search(criteria);
    return c.json(result);
  },
);

app.patch(
  '/:id',
  authMiddleware,
  requirePermission('providers:update'),
  zValidator('json', updateProviderSchema),
  async (c) => {
    const id = c.req.param('id');
    const data = c.req.valid('json');
    const provider = await providerManager.updateProvider.update(id, data);
    return c.json(provider);
  },
);

app.delete(
  '/:id',
  authMiddleware,
  requirePermission('providers:delete'),
  async (c) => {
    const id = c.req.param('id');
    await providerManager.deleteProvider.delete(id);
    return c.json({ message: 'Proveedor eliminado exitosamente' });
  },
);

export default app;
