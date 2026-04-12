import type { PurchaseStatus } from '@shared/types';

export interface CreatePurchaseItemDTO {
  productId: string;
  quantity: number;
  pricePerUnit: number;
}

export interface CreatePurchaseDTO {
  providerId: string;
  createdById: string;
  items: CreatePurchaseItemDTO[];
}

export interface UpdatePurchaseDTO {
  status?: PurchaseStatus;
}
