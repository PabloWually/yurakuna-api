import type {
  Purchase,
  PurchaseDetails,
  PurchaseItem,
  PurchaseWithItems,
} from '@core/purchase/domain/entity/purchase';
import type { CreatePurchaseDTO, UpdatePurchaseDTO } from '@core/purchase/domain/DTOs/purchaseDTO';
import type { Criteria } from '@shared/criteria';

export interface IPurchaseRepository {
  findById(id: string): Promise<Purchase | null>;
  findByIdWithItems(id: string): Promise<PurchaseDetails | null>;
  create(data: CreatePurchaseDTO): Promise<PurchaseWithItems>;
  update(id: string, data: UpdatePurchaseDTO): Promise<Purchase | null>;
  delete(id: string): Promise<boolean>;
  search(criteria: Criteria): Promise<PurchaseDetails[]>;
  count(criteria: Criteria): Promise<number>;
  updatePurchaseItem(
    itemId: string,
    quantity: string,
    pricePerUnit: string,
  ): Promise<PurchaseItem | null>;
  deletePurchaseItem(itemId: string): Promise<boolean>;
  addPurchaseItem(
    purchaseId: string,
    productId: string,
    quantity: string,
    pricePerUnit: string,
  ): Promise<PurchaseItem | null>;
}
