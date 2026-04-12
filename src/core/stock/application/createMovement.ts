import type { IStockRepository } from "@core/stock/domain/repositories/IStockRepository";
import type { IProductRepository } from "@core/product/domain/repositories/IProductRepository";
import type { CreateStockMovementDTO } from "@core/stock/domain/DTOs/stockDTO";
import type { StockMovement } from "@core/stock/domain/entity/stock";

export class CreateMovement {
  constructor(
    private stockRepository: IStockRepository,
    private productRepository: IProductRepository,
  ) {}

  createMovement = async (data: CreateStockMovementDTO): Promise<StockMovement> => {
    const product = await this.productRepository.findById(data.productId);
    const quantityBefore = Number(product?.currentStock ?? 0);
    const isDecrease = data.type === 'out' || data.type === 'shrinkage';
    const quantityAfter = isDecrease
      ? quantityBefore - data.quantity
      : quantityBefore + data.quantity;

    return this.stockRepository.createMovement({
      ...data,
      quantityBefore,
      quantityAfter,
    });
  };
}
