import { PrismaRepository } from "../../shared/infrastructure/PrismaRepository";
import { PurchaseDetail, PurchaseDetailRepository } from "../domain";
import { PurchaseDetailId } from "../domain/PurchaseDetail";
import { Nullable } from "../../shared/domain/Nullable";
import { Criteria } from "../../shared/domain/Criteria";
import { PrismaCriteriaConverter } from "../../shared/infrastructure/PrismaCriteriaConverter";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { PrismaFiltersConverter } from "../../shared/infrastructure/PrismaFilterConverter";
import { Primitives } from "../../shared/domain/Primitives";

export class PrismaPurchaseDetailRepository extends PrismaRepository
  implements PurchaseDetailRepository {
  async save(purchaseDetail: PurchaseDetail): Promise<void> {
    const data = purchaseDetail.toPrimitives();
    await this.prisma.purchaseDetail.upsert({
      create: { ...data },
      update: { ...data },
      where: { id: data.id }
    });
  }

  async delete(purchaseDetailId: PurchaseDetailId): Promise<void> {
    await this.prisma.client.update({
      where: { id: purchaseDetailId.value },
      data: {
        isActive: false,
      }
    });
  }

  async find(purchaseDetailId: PurchaseDetailId): Promise<Nullable<PurchaseDetail>> {
    const response = await this.prisma.purchaseDetail.findUnique({
      where: {
        id: purchaseDetailId.value,
        isActive: true,
      }
    });
    if (response) {
      return PurchaseDetail.fromPrimitives(response);
    }
    return null;
  }

  async matching(criteria: Criteria): Promise<PurchaseDetail[]> {
    const response = await this.prisma.purchaseDetail.findMany({
      ...PrismaCriteriaConverter(criteria),
    });
    const data = response.map((purchaseDetail: Primitives<PurchaseDetail>) => {
      return PurchaseDetail.fromPrimitives(purchaseDetail);
    });
    return data;
  }

  async count(filters: Filter[]): Promise<number> {
    return await this.prisma.purchaseDetail.count({
      where: PrismaFiltersConverter(filters),
    });
  }
}
