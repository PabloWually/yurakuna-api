import type { IProductRepository } from "@core/product/domain/repositories/IProductRepository";
import type { Product } from "@core/product/domain/entity/product";

export class Find {
  constructor(private productRepository: IProductRepository) {}

  findById = async(id: string): Promise<Product | null> => {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  findByName = async(name: string): Promise<Product | null> => {
    const product = await this.productRepository.findByName(name);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
}
