import type { StockMovementType, ShrinkageCause } from "@shared/types";

export interface StockMovement {
  id: string;
  productId: string;
  type: StockMovementType;
  quantity: string;
  reason: string | null;
  purchaseId: string | null;
  deliveryId: string | null;
  shrinkageId: string | null;
  createdAt: Date;
}

export interface Shrinkage {
  id: string;
  productId: string;
  quantity: string;
  cause: ShrinkageCause;
  notes: string | null;
  createdAt: Date;
}
