import type { IPurchaseRepository } from '@core/purchase/domain/repositories/IPurchaseRepository';
import type { Purchase, PurchaseDetails } from '@core/purchase/domain/entity/purchase';

export class Find {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  findById = (id: string): Promise<Purchase | null> => {
    return this.purchaseRepository.findById(id);
  };

  findByIdWithItems = (id: string): Promise<PurchaseDetails | null> => {
    return this.purchaseRepository.findByIdWithItems(id);
  };
}
