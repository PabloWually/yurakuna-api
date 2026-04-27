import type { Database } from "@database/connection";
import type { IOrderRepository } from "@core/order/domain/repositories/IOrderRepository";
import { eq, desc, count, and } from "drizzle-orm";
import { orders, orderItems, products, clients, orderStatusEnum } from "@database/schemas";
import type {
  CreateOrderDTO,
  UpdateOrderDTO,
} from "@core/order/domain/DTOs/orderDTO";
import type {
  Order,
  OrderDetails,
  OrderItem,
  OrderWithItems,
} from "@core/order/domain/entity/order";
import { extractFilters, type Criteria } from "@shared/criteria";

export class OrderDrizzleRepository implements IOrderRepository {
  private readonly columnMap = {
    id: orders.id,
    clientId: orders.clientId,
    status: orders.status,
    totalAmount: orders.totalAmount,
    createdById: orders.createdById,
    isActive: orders.isActive,
    createdAt: orders.createdAt,
    updatedAt: orders.updatedAt,
  };

  constructor(private db: Database) {}

  findById = async (id: string): Promise<Order | null> => {
    const result = await this.db
      .select()
      .from(orders)
      .where(and(eq(orders.id, id), eq(orders.isActive, true)))
      .limit(1);
    return result[0] || null;
  };

  findByIdWithItems = async (id: string): Promise<OrderDetails | null> => {
    const whereCondition = extractFilters(
      [{ field: "id", operator: "eq", value: id }],
      this.columnMap,
    );
    const order = await this.db.query.orders.findFirst({
      with: {
        items: {
          with: {
            product: true,
          },
        },
        client: true,
      },
      where: whereCondition,
    });
    if (!order) return null;

    return order;
  };

  create = async (data: CreateOrderDTO): Promise<OrderWithItems> => {
    return await this.db.transaction(async (tx) => {
      // Fetch product prices for each item
      const productIds = data.items.map((item) => item.productId);
      const productRecords = await Promise.all(
        productIds.map((productId) =>
          tx
            .select({ id: products.id, pricePerUnit: products.pricePerUnit })
            .from(products)
            .where(eq(products.id, productId))
            .limit(1)
            .then((r) => r[0]),
        ),
      );

      const priceMap = new Map(
        productRecords.filter(Boolean).map((p) => [p!.id, p!.pricePerUnit]),
      );

      // Calculate subtotals and total amount
      let totalAmount = 0;
      const itemsWithPrices = data.items.map((item) => {
        const pricePerUnit = Number(priceMap.get(item.productId) ?? 0);
        const subtotal = pricePerUnit * item.quantity;
        totalAmount += subtotal;
        return {
          productId: item.productId,
          quantity: item.quantity.toString(),
          pricePerUnit: pricePerUnit.toString(),
          subtotal: subtotal.toString(),
        };
      });

      // Insert the order
      const [newOrder] = await tx
        .insert(orders)
        .values({
          clientId: data.clientId,
          createdById: data.createdById,
          totalAmount: totalAmount.toString(),
        })
        .returning();

      if (!newOrder) throw new Error("Failed to create order");

      // Insert order items
      const insertedItems: OrderItem[] = [];
      if (itemsWithPrices.length > 0) {
        const newItems = await tx
          .insert(orderItems)
          .values(
            itemsWithPrices.map((item) => ({
              orderId: newOrder.id,
              productId: item.productId,
              quantity: item.quantity,
              pricePerUnit: item.pricePerUnit,
              subtotal: item.subtotal,
            })),
          )
          .returning();
        insertedItems.push(...newItems);
      }

      return { ...newOrder, items: insertedItems };
    });
  };

  update = async (id: string, data: UpdateOrderDTO): Promise<Order | null> => {
    const updateData: any = { updatedAt: new Date() };
    if (data.status !== undefined) updateData.status = data.status;
    const result = await this.db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning();
    return result[0] || null;
  };

  delete = async (id: string): Promise<boolean> => {
    const result = await this.db
      .update(orders)
      .set({ isActive: false })
      .where(and(eq(orders.id, id), eq(orders.status, orderStatusEnum.enumValues[0])))
      .returning();
    return result.length > 0;
  };

  search = async (criteria: Criteria): Promise<OrderDetails[]> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);
    const response = await this.db.query.orders.findMany({
      with: {
        client: true,
        items: {
          columns: {
            productId: true,
          },
        },
      },
      where: whereCondition,
      limit: criteria.limit,
      offset: criteria.offset,
      orderBy: desc(orders.createdAt),
    });
    return response;
  };

  count = async (criteria: Criteria): Promise<number> => {
    const whereCondition = extractFilters(criteria.filters, this.columnMap);
    const totalCount = await this.db
      .select({ count: count() })
      .from(orders)
      .where(whereCondition);
    return totalCount[0]?.count || 0;
  };

  searchByClient = async (
    clientId: string,
    criteria: Criteria,
  ): Promise<Order[]> => {
    const baseCondition = eq(orders.clientId, clientId);
    const filterCondition = extractFilters(criteria.filters, this.columnMap);
    const whereCondition = filterCondition
      ? and(baseCondition, filterCondition)
      : baseCondition;
    return await this.db
      .select()
      .from(orders)
      .where(whereCondition)
      .orderBy(desc(orders.createdAt))
      .limit(criteria.limit)
      .offset(criteria.offset);
  };

  countByClient = async (
    clientId: string,
    criteria: Criteria,
  ): Promise<number> => {
    const baseCondition = eq(orders.clientId, clientId);
    const filterCondition = extractFilters(criteria.filters, this.columnMap);
    const whereCondition = filterCondition
      ? and(baseCondition, filterCondition)
      : baseCondition;
    const totalCount = await this.db
      .select({ count: count() })
      .from(orders)
      .where(whereCondition);
    return totalCount[0]?.count || 0;
  };

  // Methods for managing order items
  updateOrderItem = async (
    itemId: string,
    quantity: string,
  ): Promise<OrderItem | null> => {
    // Fetch the item to get its current pricePerUnit
    const item = await this.db
      .select()
      .from(orderItems)
      .where(eq(orderItems.id, itemId))
      .limit(1);

    if (!item[0]) return null;

    // Calculate new subtotal
    const pricePerUnit = item[0].pricePerUnit;
    const subtotal = (Number(pricePerUnit) * Number(quantity)).toString();

    const result = await this.db
      .update(orderItems)
      .set({
        quantity,
        subtotal,
      })
      .where(eq(orderItems.id, itemId))
      .returning();

    return result[0] || null;
  };

  deleteOrderItem = async (itemId: string): Promise<boolean> => {
    const result = await this.db
      .delete(orderItems)
      .where(eq(orderItems.id, itemId))
      .returning();
    return result.length > 0;
  };

  addOrderItem = async (
    orderId: string,
    productId: string,
    quantity: string,
  ): Promise<OrderItem | null> => {
    // Fetch product price
    const product = await this.db
      .select({ pricePerUnit: products.pricePerUnit })
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!product[0]) return null;

    const pricePerUnit = product[0].pricePerUnit;
    const subtotal = (Number(pricePerUnit) * Number(quantity)).toString();

    const result = await this.db
      .insert(orderItems)
      .values({
        orderId,
        productId,
        quantity,
        pricePerUnit: pricePerUnit.toString(),
        subtotal,
      })
      .returning();

    return result[0] || null;
  };
}
