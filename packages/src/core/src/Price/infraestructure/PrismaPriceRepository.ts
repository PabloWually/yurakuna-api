import { PrismaRepository } from "../../shared/infrastructure/PrismaRepository";
import { Price, PriceRepository } from "../domain";
import { PriceId, ProductId } from "../domain/Price";
import { Nullable } from "../../shared/domain/Nullable";
import { Criteria } from "../../shared/domain/Criteria";
import { PrismaCriteriaConverter } from "../../shared/infrastructure/PrismaCriteriaConverter";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { PrismaFiltersConverter } from "../../shared/infrastructure/PrismaFilterConverter";
import { Primitives } from "../../shared/domain/Primitives";

export class PrismaPriceRepository extends PrismaRepository
  implements PriceRepository {
  async save(price: Price): Promise<void> {
    const data = price.toPrimitives();
    await this.prisma.price.upsert({
      create: { ...data },
      update: { ...data },
      where: { id: data.id }
    });
  }

  async delete(priceId: PriceId): Promise<void> {
    await this.prisma.price.update({
      where: { id: priceId.value },
      data: {
        isActive: false,
      }
    });
  }

  async find(productId: ProductId): Promise<Nullable<Price>> {
    const response = await this.prisma.price.findUnique({
      where: {
        productId: productId.value,
        isActive: true,
      }
    });
    if (response) {
      return Price.fromPrimitives(response);
    }
    return null;
  }

  async matching(criteria: Criteria): Promise<Price[]> {
    const response = await this.prisma.price.findMany({
      ...PrismaCriteriaConverter(criteria),
    });
    const data = response.map((price: Primitives<Price>) => {
      return Price.fromPrimitives(price);
    });
    return data;
  }

  async count(filters: Filter[]): Promise<number> {
    return await this.prisma.price.count({
      where: PrismaFiltersConverter(filters),
    });
  }
}
