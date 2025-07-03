import { PrismaRepository } from "../../shared/infrastructure/PrismaRepository";
import { Product, ProductRepository } from "../domain";
import { ProductId } from "../domain/Product";
import { Nullable } from "../../shared/domain/Nullable";
import { Criteria } from "../../shared/domain/Criteria";
import { PrismaCriteriaConverter } from "../../shared/infrastructure/PrismaCriteriaConverter";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { PrismaFiltersConverter } from "../../shared/infrastructure/PrismaFilterConverter";
import { Primitives } from "../../shared/domain/Primitives";

export class PrismaProductRepository extends PrismaRepository
  implements ProductRepository {
  async save(product: Product): Promise<void> {
    const data = product.toPrimitives();
    await this.prisma.product.upsert({
      create: { ...data },
      update: { ...data },
      where: { id: data.id }
    });
  }

  async delete(productId: ProductId): Promise<void> {
    await this.prisma.product.update({
      where: { id: productId.value },
      data: {
        isActive: false,
      }
    });
  }

  async find(productId: ProductId): Promise<Nullable<Product>> {
    const response = await this.prisma.product.findUnique({
      where: {
        id: productId.value,
        isActive: true,
      }
    });
    if (response) {
      return Product.fromPrimitives(response);
    }
    return null;
  }

  async matching(criteria: Criteria): Promise<Product[]> {
    const response = await this.prisma.product.findMany({
      ...PrismaCriteriaConverter(criteria),
      orderBy: { name: "asc" },
    });
    const data = response.map((product: Primitives<Product>) => {
      return Product.fromPrimitives(product);
    });
    return data;
  }

  async count(filters: Filter[]): Promise<number> {
    return await this.prisma.product.count({
      where: PrismaFiltersConverter(filters),
    });
  }
}
