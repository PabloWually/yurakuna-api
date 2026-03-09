import type { IProductRepository } from "@core/product/domain/repositories/IProductRepository";
import type { CreateProductDTO } from "@core/product/domain/DTOs/productDTO";
import type { Product } from "@core/product/domain/entity/product";

export class Create {
  constructor(private productRepository: IProductRepository) {}

  create = (data: CreateProductDTO): Promise<Product> => {
    return this.productRepository.create(data);
  }
}
