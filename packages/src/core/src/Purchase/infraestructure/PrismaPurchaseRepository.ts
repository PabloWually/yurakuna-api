import { PrismaRepository } from "../../shared/infrastructure/PrismaRepository";
import { Purchase, PurchaseRepository } from "../domain";
import { PurchaseId } from "../domain/Purchase";
import { Nullable } from "../../shared/domain/Nullable";
import { Criteria } from "../../shared/domain/Criteria";
import { PrismaCriteriaConverter } from "../../shared/infrastructure/PrismaCriteriaConverter";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { PrismaFiltersConverter } from "../../shared/infrastructure/PrismaFilterConverter";
import { Primitives } from "../../shared/domain/Primitives";

export class PrismaPurchaseRepository extends PrismaRepository
  implements PurchaseRepository {
  async save(purchase: Purchase): Promise<void> {
    const data = purchase.toPrimitives();
    await this.prisma.purchase.upsert({
      create: { ...data },
      update: { ...data },
      where: { id: data.id }
    });
  }

  async delete(purchaseId: PurchaseId): Promise<void> {
    await this.prisma.purchase.update({
      where: { id: purchaseId.value },
      data: {
        isActive: false,
      }
    });
  }

  async find(purchaseId: PurchaseId): Promise<Nullable<Purchase>> {
    const response = await this.prisma.purchase.findUnique({
      where: {
        id: purchaseId.value,
        isActive: true,
      }
    });
    if (response) {
      return Purchase.fromPrimitives(response);
    }
    return null;
  }

  async matching(criteria: Criteria): Promise<Purchase[]> {
    const response = await this.prisma.purchase.findMany({
      ...PrismaCriteriaConverter(criteria),
    });
    const data = response.map((purchase: Primitives<Purchase>) => {
      return Purchase.fromPrimitives(purchase);
    });
    return data;
  }

  async count(filters: Filter[]): Promise<number> {
    return await this.prisma.purchase.count({
      where: PrismaFiltersConverter(filters),
    });
  }
}
