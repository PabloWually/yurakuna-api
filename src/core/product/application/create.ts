import type { IProductRepository } from "@core/product/domain/repositories/IProductRepository";
import type { CreateProductDTO } from "@core/product/domain/DTOs/productDTO";
import type { Product } from "@core/product/domain/entity/product";
import type { IStockRepository } from "@core/stock/domain/repositories/IStockRepository";

export class Create {
  constructor(
    private productRepository: IProductRepository,
    private stockRepository: IStockRepository,
  ) {}

  create = async (data: CreateProductDTO): Promise<Product> => {
    const product = await this.productRepository.create(data);
    if (data.currentStock) {
      await this.stockRepository.createMovement({
        productId: product.id,
        type: "in",
        quantity: data.currentStock,
        quantityBefore: 0,
        quantityAfter: data.currentStock,
      });
    }
    return product;
  };
}
