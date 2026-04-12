import type { IProviderRepository } from '@core/provider/domain/repositories/IProviderRepository';
import type { CreateProviderDTO } from '@core/provider/domain/DTOs/providerDTO';
import type { Provider } from '@core/provider/domain/entity/provider';

export class Create {
  constructor(private providerRepository: IProviderRepository) {}

  create = (data: CreateProviderDTO): Promise<Provider> => {
    return this.providerRepository.create(data);
  };
}
