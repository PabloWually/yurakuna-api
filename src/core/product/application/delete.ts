import type { IProductRepository } from "@core/product/domain/repositories/IProductRepository";

export class Delete {
  constructor(private productRepository: IProductRepository) {}

  delete = async(id: string): Promise<boolean> => {
    const product = await this.productRepository.delete(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
}
