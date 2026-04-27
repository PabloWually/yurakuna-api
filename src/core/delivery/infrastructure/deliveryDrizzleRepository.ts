import type { Database } from "@database/connection";
import type { IDeliveryRepository } from "@core/delivery/domain/repositories/IDeliveryRepository";
import { eq, desc, count, and } from "drizzle-orm";
import { deliveries, deliveryItems, deliveryStatusEnum } from "@database/schemas";
import type {
  CreateDeliveryDTO,
  UpdateDeliveryDTO,
} from "@core/delivery/domain/DTOs/deliveryDTO";
import type {
  Delivery,
  DeliveryDetails,
  DeliveryWithItems,
  DeliveryItem,
} from "@core/delivery/domain/entity/delivery";
import { extractFilters, type Criteria } from "@shared/criteria";

export class DeliveryDrizzleRepository implements IDeliveryRepository {
  private readonly columnMap = {
    id: deliveries.id,
    orderId: deliveries.orderId,
    clientId: deliveries.clientId,
    deliveryAddress: deliveries.deliveryAddress,
    status: deliveries.status,
    deliveredAt: deliveries.deliveredAt,
    notes: deliveries.notes,
    isActive: deliveries.isActive,
    createdAt: deliveries.createdAt,
    updatedAt: deliveries.updatedAt,
  };

  constructor(private db: Database) {}

  findById = async (id: string): Promise<Delivery | null> => {
    const result = await this.db
      .select()
      .from(deliveries)
      .where(and(eq(deliveries.id, id), eq(deliveries.isActive, true)))
      .limit(1);
    return result[0] || null;
  };

  findByIdWithItems = async (id: string): Promise<DeliveryDetails | null> => {
    const result = await this.db.query.deliveries.findFirst({
      where: and(eq(deliveries.id, id), eq(deliveries.isActive, true)),
      with: {
        items: {
          with: {
            product: true,
          },
        },
      },
    });
    if (!result) return null;
    return {
      ...result,
      items: result.items ?? [],
    };
  };

  findByOrderId = async (orderId: string): Promise<Delivery | null> => {
    const result = await this.db
      .select()
      .from(deliveries)
      .where(and(eq(deliveries.orderId, orderId), eq(deliveries.isActive, true)))
      .limit(1);
    return result[0] || null;
  };

  create = async (data: CreateDeliveryDTO): Promise<DeliveryWithItems> => {
    return await this.db.transaction(async (tx) => {
      const [delivery] = await tx
        .insert(deliveries)
        .values({
          orderId: data.orderId,
          clientId: data.clientId,
          deliveryAddress: data.deliveryAddress,
          notes: data.notes || null,
        })
        .returning();

      if (!delivery) throw new Error("Failed to create delivery");

      const insertedItems =
        data.items.length > 0
          ? await tx
              .insert(deliveryItems)
              .values(
                data.items.map((item) => ({
                  deliveryId: delivery.id,
                  orderItemId: item.orderItemId,
                  productId: item.productId,
                  quantity: String(item.quantity),
                })),
              )
              .returning()
          : [];

      return { ...delivery, items: insertedItems };
    });
  };

  update = async (
    id: string,
    data: UpdateDeliveryDTO,
  ): Promise<Delivery | null> => {
    const updateData: any = { updatedAt: new Date() };
    if (data.status !== undefined) updateData.status = data.status;
    if (data.deliveredAt !== undefined)
      updateData.deliveredAt = data.deliveredAt;
    if (data.notes !== undefined) updateData.notes = data.notes;
    const result = await this.db
      .update(deliveries)
      .set(updateData)
      .where(eq(deliveries.id, id))
      .returning();
    return result[0] || null;
  };

  delete = async (id: string): Promise<boolean> => {
    const result = await this.db
      .update(deliveries)
      .set({ isActive: false })
      .where(and(eq(deliveries.id, id), eq(deliveries.status, deliveryStatusEnum.enumValues[0])))
      .returning();
    return result.length > 0;
  };

  search = async (criteria: Criteria): Promise<DeliveryDetails[]> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);
    return await this.db.query.deliveries.findMany({
      with: { client: true },
      where: whereCondition,
      limit: criteria.limit,
      offset: criteria.offset,
      orderBy: desc(deliveries.createdAt),
    });
  };

  count = async (criteria: Criteria): Promise<number> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);
    const totalCount = await this.db
      .select({ count: count() })
      .from(deliveries)
      .where(whereCondition);
    return totalCount[0]?.count || 0;
  };

  // Methods for managing delivery items
  updateDeliveryItem = async (
    itemId: string,
    quantity: string,
  ): Promise<DeliveryItem | null> => {
    const result = await this.db
      .update(deliveryItems)
      .set({
        quantity,
      })
      .where(eq(deliveryItems.id, itemId))
      .returning();

    return result[0] || null;
  };

  deleteDeliveryItem = async (itemId: string): Promise<boolean> => {
    const result = await this.db
      .delete(deliveryItems)
      .where(eq(deliveryItems.id, itemId))
      .returning();
    return result.length > 0;
  };

  addDeliveryItem = async (
    deliveryId: string,
    orderItemId: string,
    productId: string,
    quantity: string,
  ): Promise<DeliveryItem | null> => {
    const result = await this.db
      .insert(deliveryItems)
      .values({
        deliveryId,
        orderItemId,
        productId,
        quantity,
      })
      .returning();

    return result[0] || null;
  };
}
