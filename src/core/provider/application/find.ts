import type { IProviderRepository } from '@core/provider/domain/repositories/IProviderRepository';
import type { Provider } from '@core/provider/domain/entity/provider';

export class Find {
  constructor(private providerRepository: IProviderRepository) {}

  findById = (id: string): Promise<Provider | null> => {
    return this.providerRepository.findById(id);
  };

  findByName = (name: string): Promise<Provider | null> => {
    return this.providerRepository.findByName(name);
  };
}
