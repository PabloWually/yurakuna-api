import type { IStockRepository } from "@core/stock/domain/repositories/IStockRepository";
import type { Shrinkage } from "@core/stock/domain/entity/stock";
import type { Criteria } from "@shared/criteria";

export class ListShrinkage {
  constructor(private stockRepository: IStockRepository) {}

  list = async (
    criteria: Criteria,
  ): Promise<{ data: Shrinkage[]; total: number }> => {
    const [shrinkageRecords, total] = await Promise.all([
      this.stockRepository.searchShrinkage(criteria),
      this.stockRepository.countShrinkage(criteria),
    ]);

    return {
      data: shrinkageRecords,
      total,
    };
  };
}
