import type { IStockRepository } from "@core/stock/domain/repositories/IStockRepository";
import type { IProductRepository } from "@core/product/domain/repositories/IProductRepository";
import type { CreateShrinkageDTO } from "@core/stock/domain/DTOs/stockDTO";
import type { Shrinkage } from "@core/stock/domain/entity/stock";

export class CreateShrinkage {
  constructor(
    private stockRepository: IStockRepository,
    private productRepository: IProductRepository,
  ) {}

  createShrinkage = async (data: CreateShrinkageDTO): Promise<Shrinkage> => {
    const shrinkageRecord = await this.stockRepository.createShrinkage(data);

    await this.stockRepository.createMovement({
      productId: data.productId,
      type: 'shrinkage',
      quantity: data.quantity,
      reason: `Merma: ${data.cause}${data.notes ? ` — ${data.notes}` : ''}`,
      shrinkageId: shrinkageRecord.id,
    });

    await this.productRepository.updateStock(data.productId, -data.quantity);

    return shrinkageRecord;
  };
}
