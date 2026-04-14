import type { Database } from "@database/connection";
import type { IStockRepository } from "@core/stock/domain/repositories/IStockRepository";
import { desc, count } from "drizzle-orm";
import { stockMovements, shrinkage } from "@database/schemas";
import type { RecordStockMovementDTO, CreateShrinkageDTO } from "@core/stock/domain/DTOs/stockDTO";
import type { StockMovement, Shrinkage, ShrinkageDetails, StockDetails } from "@core/stock/domain/entity/stock";
import { extractFilters, type Criteria } from "@shared/criteria";

export class StockDrizzleRepository implements IStockRepository {
  private readonly movementColumnMap = {
    id: stockMovements.id,
    productId: stockMovements.productId,
    type: stockMovements.type,
    quantity: stockMovements.quantity,
    reason: stockMovements.reason,
    purchaseId: stockMovements.purchaseId,
    deliveryId: stockMovements.deliveryId,
    shrinkageId: stockMovements.shrinkageId,
    quantityBefore: stockMovements.quantityBefore,
    quantityAfter: stockMovements.quantityAfter,
    isActive: stockMovements.isActive,
    createdAt: stockMovements.createdAt,
  };

  private readonly shrinkageColumnMap = {
    id: shrinkage.id,
    productId: shrinkage.productId,
    quantity: shrinkage.quantity,
    cause: shrinkage.cause,
    notes: shrinkage.notes,
    isActive: shrinkage.isActive,
    createdAt: shrinkage.createdAt,
  };

  constructor(private db: Database) {}

  createMovement = async (data: RecordStockMovementDTO): Promise<StockMovement> => {
    const result = await this.db
      .insert(stockMovements)
      .values({
        productId: data.productId,
        type: data.type,
        quantity: data.quantity.toString(),
        reason: data.reason || null,
        purchaseId: data.purchaseId || null,
        deliveryId: data.deliveryId || null,
        shrinkageId: data.shrinkageId || null,
        quantityBefore: data.quantityBefore.toString(),
        quantityAfter: data.quantityAfter.toString(),
      })
      .returning();
    if (!result[0]) throw new Error("Failed to create stock movement");
    return result[0];
  };

  createShrinkage = async (data: CreateShrinkageDTO): Promise<Shrinkage> => {
    const result = await this.db
      .insert(shrinkage)
      .values({
        productId: data.productId,
        quantity: data.quantity.toString(),
        cause: data.cause,
        notes: data.notes || null,
      })
      .returning();
    if (!result[0]) throw new Error("Failed to create shrinkage record");
    return result[0];
  };

  searchMovements = async (criteria: Criteria): Promise<StockDetails[]> => {
    const whereCondition = extractFilters(criteria.filters, this.movementColumnMap);
    return await this.db.query.stockMovements.findMany({
      with: { product: true },
      where: whereCondition,
      limit: criteria.limit,
      offset: criteria.offset,
    });
  };

  countMovements = async (criteria: Criteria): Promise<number> => {
    const whereCondition = extractFilters(criteria.filters, this.movementColumnMap);
    const totalCount = await this.db
      .select({ count: count() })
      .from(stockMovements)
      .where(whereCondition);
    return totalCount[0]?.count || 0;
  };

  searchShrinkage = async (criteria: Criteria): Promise<ShrinkageDetails[]> => {
    const whereCondition = extractFilters(criteria.filters, this.shrinkageColumnMap);
    return await this.db.query.shrinkage.findMany({
      with: { product: true },
      where: whereCondition,
      limit: criteria.limit,
      offset: criteria.offset,
    });
  };

  countShrinkage = async (criteria: Criteria): Promise<number> => {
    const whereCondition = extractFilters(criteria.filters, this.shrinkageColumnMap);
    const totalCount = await this.db
      .select({ count: count() })
      .from(shrinkage)
      .where(whereCondition);
    return totalCount[0]?.count || 0;
  };
}
