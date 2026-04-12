import type { IPurchaseRepository } from '@core/purchase/domain/repositories/IPurchaseRepository';
import type { UpdatePurchaseDTO } from '@core/purchase/domain/DTOs/purchaseDTO';
import type { Purchase } from '@core/purchase/domain/entity/purchase';

export class Update {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  update = (id: string, data: UpdatePurchaseDTO): Promise<Purchase | null> => {
    return this.purchaseRepository.update(id, data);
  };
}
