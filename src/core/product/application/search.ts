import type { IProductRepository } from "@core/product/domain/repositories/IProductRepository";
import type { Product } from "@core/product/domain/entity/product";
import type { Criteria } from "@shared/criteria";

export class Search {
  constructor(private productRepository: IProductRepository) {}

  search = async (
    criteria: Criteria,
  ): Promise<{ data: Product[]; total: number }> => {
    const [products, total] = await Promise.all([
      this.productRepository.search(criteria),
      this.productRepository.count(criteria),
    ]);

    return {
      data: products,
      total,
    };
  };
}
