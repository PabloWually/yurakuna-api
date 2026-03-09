import type { Database } from "@database/connection";
import type { IDeliveryRepository } from "@core/delivery/domain/repositories/IDeliveryRepository";
import { eq, desc, count } from "drizzle-orm";
import { deliveries } from "@database/schemas";
import type { CreateDeliveryDTO, UpdateDeliveryDTO } from "@core/delivery/domain/DTOs/deliveryDTO";
import type { Delivery } from "@core/delivery/domain/entity/delivery";
import { extractFilters, type Criteria } from "@shared/criteria";

export class DeliveryRepository implements IDeliveryRepository {
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
      .where(eq(deliveries.id, id))
      .limit(1);
    return result[0] || null;
  };

  findByOrderId = async (orderId: string): Promise<Delivery | null> => {
    const result = await this.db
      .select()
      .from(deliveries)
      .where(eq(deliveries.orderId, orderId))
      .limit(1);
    return result[0] || null;
  };

  create = async (data: CreateDeliveryDTO): Promise<Delivery> => {
    const result = await this.db
      .insert(deliveries)
      .values({
        orderId: data.orderId,
        clientId: data.clientId,
        deliveryAddress: data.deliveryAddress,
        notes: data.notes || null,
      })
      .returning();
    if (!result[0]) throw new Error("Failed to create delivery");
    return result[0];
  };

  update = async (id: string, data: UpdateDeliveryDTO): Promise<Delivery | null> => {
    const updateData: any = { updatedAt: new Date() };
    if (data.status !== undefined) updateData.status = data.status;
    if (data.deliveredAt !== undefined) updateData.deliveredAt = data.deliveredAt;
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
      .delete(deliveries)
      .where(eq(deliveries.id, id))
      .returning();
    return result.length > 0;
  };

  search = async (criteria: Criteria): Promise<Delivery[]> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);
    return await this.db
      .select()
      .from(deliveries)
      .where(whereCondition)
      .orderBy(desc(deliveries.createdAt))
      .limit(criteria.limit)
      .offset(criteria.offset);
  };

  count = async (criteria: Criteria): Promise<number> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);
    const totalCount = await this.db
      .select({ count: count() })
      .from(deliveries)
      .where(whereCondition);
    return totalCount[0]?.count || 0;
  };
}
