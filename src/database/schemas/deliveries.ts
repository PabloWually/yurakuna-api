import { pgTable, uuid, varchar, text, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { clients } from './clients';

export const deliveryStatusEnum = pgEnum('delivery_status', ['pending', 'in_transit', 'completed', 'failed']);

export const deliveries = pgTable('deliveries', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'restrict' }),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'restrict' }),
  deliveryAddress: text('delivery_address').notNull(),
  status: deliveryStatusEnum('status').notNull().default('pending'),
  deliveredAt: timestamp('delivered_at'),
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
