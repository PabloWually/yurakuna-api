import type { IStockRepository } from "@core/stock/domain/repositories/IStockRepository";
import type { CreateShrinkageDTO } from "@core/stock/domain/DTOs/stockDTO";
import type { Shrinkage } from "@core/stock/domain/entity/stock";

export class CreateShrinkage {
  constructor(private stockRepository: IStockRepository) {}

  createShrinkage = (data: CreateShrinkageDTO): Promise<Shrinkage> => {
    return this.stockRepository.createShrinkage(data);
  };
}
