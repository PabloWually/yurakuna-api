import { pgTable, uuid, text, timestamp, pgEnum, boolean, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { orders, orderItems } from './orders';
import { clients } from './clients';
import { products } from './products';

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

export const deliveryItems = pgTable('delivery_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  deliveryId: uuid('delivery_id').notNull().references(() => deliveries.id, { onDelete: 'cascade' }),
  orderItemId: uuid('order_item_id').notNull().references(() => orderItems.id, { onDelete: 'restrict' }),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'restrict' }),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const deliveriesRelations = relations(deliveries, ({ many, one }) => ({
  items: many(deliveryItems),
  client: one(clients, {
    fields: [deliveries.clientId],
    references: [clients.id],
  }),
}));

export const deliveryItemsRelations = relations(deliveryItems, ({ one }) => ({
  delivery: one(deliveries, {
    fields: [deliveryItems.deliveryId],
    references: [deliveries.id],
  }),
  orderItem: one(orderItems, {
    fields: [deliveryItems.orderItemId],
    references: [orderItems.id],
  }),
  product: one(products, {
    fields: [deliveryItems.productId],
    references: [products.id],
  }),
}));
