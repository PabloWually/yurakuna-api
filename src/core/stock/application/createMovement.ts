import type { IStockRepository } from "@core/stock/domain/repositories/IStockRepository";
import type { CreateStockMovementDTO } from "@core/stock/domain/DTOs/stockDTO";
import type { StockMovement } from "@core/stock/domain/entity/stock";

export class CreateMovement {
  constructor(private stockRepository: IStockRepository) {}

  createMovement = (data: CreateStockMovementDTO): Promise<StockMovement> => {
    return this.stockRepository.createMovement(data);
  };
}
