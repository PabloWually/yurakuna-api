import { PrismaRepository } from "../../shared/infrastructure/PrismaRepository";
import { DeliveryDetail, DeliveryDetailRepository } from "../domain";
import { DeliveryDetailId } from "../domain/DeliveryDetail";
import { Nullable } from "../../shared/domain/Nullable";
import { Criteria } from "../../shared/domain/Criteria";
import { PrismaCriteriaConverter } from "../../shared/infrastructure/PrismaCriteriaConverter";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { PrismaFiltersConverter } from "../../shared/infrastructure/PrismaFilterConverter";
import { Primitives } from "../../shared/domain/Primitives";

export class PrismaDeliveryDetailRepository extends PrismaRepository
  implements DeliveryDetailRepository {
  async save(deliveryDetail: DeliveryDetail): Promise<void> {
    const data = deliveryDetail.toPrimitives();
    await this.prisma.deliveryDetail.upsert({
      create: { ...data },
      update: { ...data },
      where: { id: data.id }
    });
  }

  async delete(deliveryDetailId: DeliveryDetailId): Promise<void> {
    await this.prisma.client.update({
      where: { id: deliveryDetailId.value },
      data: {
        isActive: false,
      }
    });
  }

  async find(deliveryDetailId: DeliveryDetailId): Promise<Nullable<DeliveryDetail>> {
    const response = await this.prisma.deliveryDetail.findUnique({
      where: {
        id: deliveryDetailId.value,
        isActive: true,
      }
    });
    if (response) {
      return DeliveryDetail.fromPrimitives(response);
    }
    return null;
  }

  async matching(criteria: Criteria): Promise<DeliveryDetail[]> {
    const response = await this.prisma.deliveryDetail.findMany({
      ...PrismaCriteriaConverter(criteria),
    });
    const data = response.map((deliveryDetail:  Primitives<DeliveryDetail>) => {
      return DeliveryDetail.fromPrimitives(deliveryDetail);
    });
    return data;
  }

  async count(filters: Filter[]): Promise<number> {
    return await this.prisma.deliveryDetail.count({
      where: PrismaFiltersConverter(filters),
    });
  }
}
