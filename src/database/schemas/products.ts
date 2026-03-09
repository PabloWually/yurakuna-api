import { pgTable, uuid, varchar, text, decimal, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core';

export const productUnitEnum = pgEnum('product_unit', ['kg', 'unities', 'lb', 'g', 'liters']);

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  unit: productUnitEnum('unit').notNull(),
  pricePerUnit: decimal('price_per_unit', { precision: 10, scale: 2 }).notNull(),
  currentStock: decimal('current_stock', { precision: 10, scale: 2 }).notNull().default('0'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
