import type { StockMovementType, ShrinkageCause } from "@shared/types";

export interface CreateStockMovementDTO {
  productId: string;
  type: StockMovementType;
  quantity: number;
  reason?: string;
}

export interface CreateShrinkageDTO {
  productId: string;
  quantity: number;
  cause: ShrinkageCause;
  notes?: string;
}
