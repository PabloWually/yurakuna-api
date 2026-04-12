import type { IProviderRepository } from '@core/provider/domain/repositories/IProviderRepository';
import type { UpdateProviderDTO } from '@core/provider/domain/DTOs/providerDTO';
import type { Provider } from '@core/provider/domain/entity/provider';

export class Update {
  constructor(private providerRepository: IProviderRepository) {}

  update = (id: string, data: UpdateProviderDTO): Promise<Provider | null> => {
    return this.providerRepository.update(id, data);
  };
}
