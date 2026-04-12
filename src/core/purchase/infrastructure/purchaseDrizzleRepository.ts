import type { Database } from '@database/connection';
import type { IPurchaseRepository } from '@core/purchase/domain/repositories/IPurchaseRepository';
import { eq, count, and } from 'drizzle-orm';
import { purchases, purchaseItems, products, providers } from '@database/schemas';
import type { CreatePurchaseDTO, UpdatePurchaseDTO } from '@core/purchase/domain/DTOs/purchaseDTO';
import type {
  Purchase,
  PurchaseDetails,
  PurchaseItem,
  PurchaseWithItems,
} from '@core/purchase/domain/entity/purchase';
import { extractFilters, type Criteria } from '@shared/criteria';

export class PurchaseDrizzleRepository implements IPurchaseRepository {
  private readonly columnMap = {
    id: purchases.id,
    providerId: purchases.providerId,
    status: purchases.status,
    totalAmount: purchases.totalAmount,
    createdById: purchases.createdById,
    isActive: purchases.isActive,
    createdAt: purchases.createdAt,
    updatedAt: purchases.updatedAt,
  };

  constructor(private db: Database) {}

  findById = async (id: string): Promise<Purchase | null> => {
    const result = await this.db
      .select()
      .from(purchases)
      .where(eq(purchases.id, id))
      .limit(1);
    return result[0] || null;
  };

  findByIdWithItems = async (id: string): Promise<PurchaseDetails | null> => {
    const whereCondition = extractFilters(
      [{ field: 'id', operator: 'eq', value: id }],
      this.columnMap,
    );
    const purchase = await this.db.query.purchases.findFirst({
      with: {
        provider: true,
        items: true,
      },
      where: whereCondition,
    });
    return purchase || null;
  };

  create = async (data: CreatePurchaseDTO): Promise<PurchaseWithItems> => {
    return await this.db.transaction(async (tx) => {
      // Calculate totals
      let totalAmount = 0;
      const itemsWithTotals = data.items.map((item) => {
        const subtotal = item.pricePerUnit * item.quantity;
        totalAmount += subtotal;
        return {
          productId: item.productId,
          quantity: item.quantity.toString(),
          pricePerUnit: item.pricePerUnit.toString(),
          subtotal: subtotal.toString(),
        };
      });

      // Insert purchase
      const [newPurchase] = await tx
        .insert(purchases)
        .values({
          providerId: data.providerId,
          createdById: data.createdById,
          totalAmount: totalAmount.toString(),
        })
        .returning();

      if (!newPurchase) throw new Error('Failed to create purchase');

      // Insert purchase items
      const insertedItems: PurchaseItem[] = [];
      if (itemsWithTotals.length > 0) {
        const newItems = await tx
          .insert(purchaseItems)
          .values(
            itemsWithTotals.map((item) => ({
              purchaseId: newPurchase.id,
              productId: item.productId,
              quantity: item.quantity,
              pricePerUnit: item.pricePerUnit,
              subtotal: item.subtotal,
            })),
          )
          .returning();
        insertedItems.push(...newItems);
      }

      return { ...newPurchase, items: insertedItems };
    });
  };

  update = async (id: string, data: UpdatePurchaseDTO): Promise<Purchase | null> => {
    const updateData: any = { updatedAt: new Date() };
    if (data.status !== undefined) updateData.status = data.status;

    const result = await this.db
      .update(purchases)
      .set(updateData)
      .where(eq(purchases.id, id))
      .returning();
    return result[0] || null;
  };

  delete = async (id: string): Promise<boolean> => {
    const result = await this.db
      .delete(purchases)
      .where(eq(purchases.id, id))
      .returning();
    return result.length > 0;
  };

  search = async (criteria: Criteria): Promise<PurchaseDetails[]> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);
    const response = await this.db.query.purchases.findMany({
      with: {
        provider: true,
        items: {
          columns: {
            productId: true,
          },
        },
      },
      where: whereCondition,
      limit: criteria.limit,
      offset: criteria.offset,
    });
    return response as PurchaseDetails[];
  };

  count = async (criteria: Criteria): Promise<number> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);
    const totalCount = await this.db
      .select({ count: count() })
      .from(purchases)
      .where(whereCondition);
    return totalCount[0]?.count || 0;
  };
}
