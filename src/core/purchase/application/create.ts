import type { IPurchaseRepository } from '@core/purchase/domain/repositories/IPurchaseRepository';
import type { CreatePurchaseDTO } from '@core/purchase/domain/DTOs/purchaseDTO';
import type { PurchaseWithItems } from '@core/purchase/domain/entity/purchase';

export class Create {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  create = (data: CreatePurchaseDTO): Promise<PurchaseWithItems> => {
    return this.purchaseRepository.create(data);
  };
}
