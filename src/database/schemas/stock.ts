import { pgTable, uuid, decimal, text, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { products } from './products';
import { purchases } from './purchases';
import { deliveries } from './deliveries';

export const stockMovementTypeEnum = pgEnum('stock_movement_type', ['in', 'out', 'adjustment', 'shrinkage']);
export const shrinkageCauseEnum = pgEnum('shrinkage_cause', ['damaged', 'expired']);

export const shrinkage = pgTable('shrinkage', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'restrict' }),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  cause: shrinkageCauseEnum('cause').notNull(),
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const stockMovements = pgTable('stock_movements', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'restrict' }),
  type: stockMovementTypeEnum('type').notNull(),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  reason: text('reason'),
  purchaseId: uuid('purchase_id').references(() => purchases.id, { onDelete: 'set null' }),
  deliveryId: uuid('delivery_id').references(() => deliveries.id, { onDelete: 'set null' }),
  shrinkageId: uuid('shrinkage_id').references(() => shrinkage.id, { onDelete: 'set null' }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const stockMovementsRelations = relations(stockMovements, ({ one }) => ({
  product: one(products, {
    fields: [stockMovements.productId],
    references: [products.id],
  }),
  purchase: one(purchases, {
    fields: [stockMovements.purchaseId],
    references: [purchases.id],
  }),
  delivery: one(deliveries, {
    fields: [stockMovements.deliveryId],
    references: [deliveries.id],
  }),
  shrinkageRecord: one(shrinkage, {
    fields: [stockMovements.shrinkageId],
    references: [shrinkage.id],
  }),
}));
