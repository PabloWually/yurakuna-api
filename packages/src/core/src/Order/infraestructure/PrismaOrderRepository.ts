import { PrismaRepository } from "../../shared/infrastructure/PrismaRepository";
import { Order, OrderRepository } from "../domain";
import { OrderId } from "../domain/Order";
import { Nullable } from "../../shared/domain/Nullable";
import { Criteria } from "../../shared/domain/Criteria";
import { PrismaCriteriaConverter } from "../../shared/infrastructure/PrismaCriteriaConverter";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { PrismaFiltersConverter } from "../../shared/infrastructure/PrismaFilterConverter";
import { Primitives } from "../../shared/domain/Primitives";

export class PrismaOrderRepository extends PrismaRepository
  implements OrderRepository {
  async save(order: Order): Promise<void> {
    const data = order.toPrimitives();
    await this.prisma.order.upsert({
      create: { ...data },
      update: { ...data },
      where: { id: data.id }
    });
  }

  async delete(orderId: OrderId): Promise<void> {
    await this.prisma.order.update({
      where: { id: orderId.value },
      data: {
        isActive: false,
      }
    });
  }

  async find(orderId: OrderId): Promise<Nullable<Order>> {
    const response = await this.prisma.order.findUnique({
      where: {
        id: orderId.value,
        isActive: true,
      }
    });
    if (response) {
      return Order.fromPrimitives(response);
    }
    return null;
  }

  async matching(criteria: Criteria): Promise<Order[]> {
    const response = await this.prisma.order.findMany({
      ...PrismaCriteriaConverter(criteria),
    });
    const data = response.map((order: Primitives<Order>) => {
      return Order.fromPrimitives(order);
    });
    return data;
  }

  async count(filters: Filter[]): Promise<number> {
    return await this.prisma.order.count({
      where: PrismaFiltersConverter(filters),
    });
  }
}
