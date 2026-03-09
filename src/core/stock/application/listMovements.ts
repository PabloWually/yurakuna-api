import type { IStockRepository } from "@core/stock/domain/repositories/IStockRepository";
import type { StockMovement } from "@core/stock/domain/entity/stock";
import type { Criteria } from "@shared/criteria";

export class ListMovements {
  constructor(private stockRepository: IStockRepository) {}

  list = async (
    criteria: Criteria,
  ): Promise<{ data: StockMovement[]; total: number }> => {
    const [movements, total] = await Promise.all([
      this.stockRepository.searchMovements(criteria),
      this.stockRepository.countMovements(criteria),
    ]);

    return {
      data: movements,
      total,
    };
  };
}
