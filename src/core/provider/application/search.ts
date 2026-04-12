import type { IProviderRepository } from '@core/provider/domain/repositories/IProviderRepository';
import type { Provider } from '@core/provider/domain/entity/provider';
import type { Criteria } from '@shared/criteria';

export class Search {
  constructor(private providerRepository: IProviderRepository) {}

  search = async (criteria: Criteria): Promise<{ data: Provider[]; total: number }> => {
    const [data, total] = await Promise.all([
      this.providerRepository.search(criteria),
      this.providerRepository.count(criteria),
    ]);
    return { data, total };
  };
}
