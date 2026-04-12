import type { StockMovementType, ShrinkageCause } from "@shared/types";

// DTO externo: lo que reciben las rutas y los use cases desde afuera
export interface CreateStockMovementDTO {
  productId: string;
  type: StockMovementType;
  quantity: number;
  reason?: string;
  purchaseId?: string;
  deliveryId?: string;
  shrinkageId?: string;
}

// DTO interno: lo que el repositorio necesita para insertar (incluye before/after computados)
export interface RecordStockMovementDTO extends CreateStockMovementDTO {
  quantityBefore: number;
  quantityAfter: number;
}

export interface CreateShrinkageDTO {
  productId: string;
  quantity: number;
  cause: ShrinkageCause;
  notes?: string;
}
