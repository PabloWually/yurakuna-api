import { PrismaRepository } from "../../shared/infrastructure/PrismaRepository";
import { OrderDetail, OrderDetailRepository } from "../domain";
import { OrderDetailId } from "../domain/OrderDetail";
import { Nullable } from "../../shared/domain/Nullable";
import { Criteria } from "../../shared/domain/Criteria";
import { PrismaCriteriaConverter } from "../../shared/infrastructure/PrismaCriteriaConverter";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { PrismaFiltersConverter } from "../../shared/infrastructure/PrismaFilterConverter";
import { Primitives } from "../../shared/domain/Primitives";

export class PrismaOrderDetailRepository extends PrismaRepository
  implements OrderDetailRepository {
  async save(orderDetail: OrderDetail): Promise<void> {
    const data = orderDetail.toPrimitives();
    await this.prisma.orderDetail.upsert({
      create: { ...data },
      update: { ...data },
      where: { id: data.id }
    });
  }

  async delete(orderDetailId: OrderDetailId): Promise<void> {
    await this.prisma.client.update({
      where: { id: orderDetailId.value },
      data: {
        isActive: false,
      }
    });
  }

  async find(orderDetailId: OrderDetailId): Promise<Nullable<OrderDetail>> {
    const response = await this.prisma.orderDetail.findUnique({
      where: {
        id: orderDetailId.value,
        isActive: true,
      }
    });
    if (response) {
      return OrderDetail.fromPrimitives(response);
    }
    return null;
  }

  async matching(criteria: Criteria): Promise<OrderDetail[]> {
    const response = await this.prisma.orderDetail.findMany({
      ...PrismaCriteriaConverter(criteria),
    });
    const data = response.map((orderDetail: Primitives<OrderDetail>) => {
      return OrderDetail.fromPrimitives(orderDetail);
    });
    return data;
  }

  async count(filters: Filter[]): Promise<number> {
    return await this.prisma.orderDetail.count({
      where: PrismaFiltersConverter(filters),
    });
  }
}
