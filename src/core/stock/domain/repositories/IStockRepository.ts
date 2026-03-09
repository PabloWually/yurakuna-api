import type { StockMovement, Shrinkage } from "@core/stock/domain/entity/stock";
import type { CreateStockMovementDTO, CreateShrinkageDTO } from "@core/stock/domain/DTOs/stockDTO";
import type { Criteria } from "@shared/criteria";

export interface IStockRepository {
  createMovement(data: CreateStockMovementDTO): Promise<StockMovement>;
  createShrinkage(data: CreateShrinkageDTO): Promise<Shrinkage>;
  searchMovements(criteria: Criteria): Promise<StockMovement[]>;
  countMovements(criteria: Criteria): Promise<number>;
  searchShrinkage(criteria: Criteria): Promise<Shrinkage[]>;
  countShrinkage(criteria: Criteria): Promise<number>;
}
