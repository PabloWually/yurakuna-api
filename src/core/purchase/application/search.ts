import type { IPurchaseRepository } from '@core/purchase/domain/repositories/IPurchaseRepository';
import type { PurchaseDetails } from '@core/purchase/domain/entity/purchase';
import type { Criteria } from '@shared/criteria';

export class Search {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  search = async (criteria: Criteria): Promise<{ data: PurchaseDetails[]; total: number }> => {
    const [data, total] = await Promise.all([
      this.purchaseRepository.search(criteria),
      this.purchaseRepository.count(criteria),
    ]);
    return { data, total };
  };
}
