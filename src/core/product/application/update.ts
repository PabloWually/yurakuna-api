import type { IProductRepository } from "@core/product/domain/repositories/IProductRepository";
import type { UpdateProductDTO } from "@core/product/domain/DTOs/productDTO";
import type { Product } from "@core/product/domain/entity/product";

export class Update {
  constructor(private productRepository: IProductRepository) {}

  update = async(id: string,data: UpdateProductDTO): Promise<Product | null>  => {
    const product = await this.productRepository.update(id, data);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  updateStock = async(id: string, quantity: number): Promise<Product | null> => {
    const product = await this.productRepository.updateStock(id, quantity);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
}
