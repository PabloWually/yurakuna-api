import type { IPurchaseRepository } from '@core/purchase/domain/repositories/IPurchaseRepository';

export class Delete {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  delete = (id: string): Promise<boolean> => {
    return this.purchaseRepository.delete(id);
  };
}
