import type { Provider } from '@core/provider/domain/entity/provider';
import type { PurchaseStatus } from '@shared/types';

export interface Purchase {
  id: string;
  providerId: string;
  status: PurchaseStatus;
  totalAmount: string;
  createdById: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseItem {
  id: string;
  purchaseId: string;
  productId: string;
  quantity: string;
  pricePerUnit: string;
  subtotal: string;
  isActive: boolean;
  createdAt: Date;
}

export interface PurchaseWithItems extends Purchase {
  items: PurchaseItem[];
}

export interface PurchaseDetails extends Purchase {
  provider: Provider;
  items?: PurchaseItem[];
  itemsCount?: number;
}
