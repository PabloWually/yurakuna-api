import { pgTable, uuid, varchar, decimal, text, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { products } from './products';

export const stockMovementTypeEnum = pgEnum('stock_movement_type', ['in', 'out', 'adjustment', 'shrinkage']);
export const shrinkageCauseEnum = pgEnum('shrinkage_cause', ['dañado', 'caducado']);

export const stockMovements = pgTable('stock_movements', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'restrict' }),
  type: stockMovementTypeEnum('type').notNull(),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  reason: text('reason'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const shrinkage = pgTable('shrinkage', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'restrict' }),
  quantity: decimal('quantity', { precision: 10, scale: 2 }).notNull(),
  cause: shrinkageCauseEnum('cause').notNull(),
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
