import { pgTable, uuid, varchar, decimal, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { clients } from './clients';
import { users } from './users';
import { products } from './products';
import { relations } from 'drizzle-orm';

export const orderStatusEnum = pgEnum('order_status', ['draft', 'confirmed', 'delivered', 'cancelled']);

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'restrict' }),
  status: orderStatusEnum('status').notNull().default('draft'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull().default('0'),
  createdById: uuid('created_by_id').notNull().references(() => users.id, { onDelete: 'restrict' }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'restrict' }),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  pricePerUnit: decimal('price_per_unit', { precision: 10, scale: 2 }).notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  client: one(clients, {
    fields: [orders.clientId],
    references: [clients.id],
  }),
  createdBy: one(users, {
    fields: [orders.createdById],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
