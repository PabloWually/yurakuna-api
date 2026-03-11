import type { Database } from "@database/connection";
import type { IProductRepository } from "@core/product/domain/repositories/IProductRepository";
import { eq, desc, count, sql } from "drizzle-orm";
import { products } from "@database/schemas";
import type {
  CreateProductDTO,
  UpdateProductDTO,
} from "@core/product/domain/DTOs/productDTO";
import type { Product } from "@core/product/domain/entity/product";
import { extractFilters, type Criteria } from "@shared/criteria";

export class ProductDrizzleRepository implements IProductRepository {
  private readonly columnMap = {
    id: products.id,
    name: products.name,
    description: products.description,
    unit: products.unit,
    pricePerUnit: products.pricePerUnit,
    currentStock: products.currentStock,
    isActive: products.isActive,
    createdAt: products.createdAt,
    updatedAt: products.updatedAt,
  };

  constructor(private db: Database) {}

  findById = async (id: string): Promise<Product | null> => {
    const result = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    return result[0] || null;
  };

  findByName = async (name: string): Promise<Product | null> => {
    const result = await this.db
      .select()
      .from(products)
      .where(eq(products.name, name))
      .limit(1);

    return result[0] || null;
  };

  create = async (data: CreateProductDTO): Promise<Product> => {
    const result = await this.db
      .insert(products)
      .values({
        name: data.name,
        description: data.description || null,
        unit: data.unit,
        pricePerUnit: data.pricePerUnit.toString(),
        currentStock: (data.currentStock || 0).toString(),
      })
      .returning();

    if (!result[0]) {
      throw new Error("Failed to create product");
    }

    return result[0];
  };

  update = async (
    id: string,
    data: UpdateProductDTO,
  ): Promise<Product | null> => {
    const updateData: any = { updatedAt: new Date() };

    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.unit !== undefined) updateData.unit = data.unit;
    if (data.pricePerUnit !== undefined)
      updateData.pricePerUnit = data.pricePerUnit.toString();
    if (data.currentStock !== undefined)
      updateData.currentStock = data.currentStock.toString();

    const result = await this.db
      .update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();

    return result[0] || null;
  };

  delete = async (id: string): Promise<boolean> => {
    const result = await this.db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    return result.length > 0;
  };

  search = async (criteria: Criteria): Promise<Product[]> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);

    const productsList = await this.db
      .select()
      .from(products)
      .where(whereCondition)
      .orderBy(desc(products.createdAt))
      .limit(criteria.limit)
      .offset(criteria.offset);

    return productsList;
  };

  count = async (criteria: Criteria): Promise<number> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);

    const totalCount = await this.db
      .select({ count: count() })
      .from(products)
      .where(whereCondition);

    return totalCount[0]?.count || 0;
  };

  updateStock = async (
    id: string,
    quantity: number,
  ): Promise<Product | null> => {
    const result = await this.db
      .update(products)
      .set({
        currentStock: sql`${products.currentStock} + ${quantity}`,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    return result[0] || null;
  };
}
