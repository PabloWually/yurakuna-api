import { PrismaRepository } from "../../shared/infrastructure/PrismaRepository";
import { Delivery, DeliveryRepository } from "../domain";
import { DeliveryId } from "../domain/Delivery";
import { Nullable } from "../../shared/domain/Nullable";
import { Criteria } from "../../shared/domain/Criteria";
import { PrismaCriteriaConverter } from "../../shared/infrastructure/PrismaCriteriaConverter";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { PrismaFiltersConverter } from "../../shared/infrastructure/PrismaFilterConverter";
import { Primitives } from "../../shared/domain/Primitives";

export class PrismaDeliveryRepository extends PrismaRepository
  implements DeliveryRepository {
  async save(delivery: Delivery): Promise<void> {
    const data = delivery.toPrimitives();
    await this.prisma.delivery.upsert({
      create: { ...data },
      update: { ...data },
      where: { id: data.id }
    });
  }

  async delete(deliveryId: DeliveryId): Promise<void> {
    await this.prisma.delivery.update({
      where: { id: deliveryId.value },
      data: {
        isActive: false,
      }
    });
  }

  async find(deliveryId: DeliveryId): Promise<Nullable<Delivery>> {
    const response = await this.prisma.delivery.findUnique({
      where: {
        id: deliveryId.value,
        isActive: true,
      }
    });
    if (response) {
      return Delivery.fromPrimitives(response);
    }
    return null;
  }

  async matching(criteria: Criteria): Promise<Delivery[]> {
    const response = await this.prisma.delivery.findMany({
      ...PrismaCriteriaConverter(criteria),
    });
    const data = response.map((delivery: Primitives<Delivery>) => {
      return Delivery.fromPrimitives(delivery);
    });
    return data;
  }

  async count(filters: Filter[]): Promise<number> {
    return await this.prisma.delivery.count({
      where: PrismaFiltersConverter(filters),
    });
  }
}
