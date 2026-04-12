import type { IProviderRepository } from '@core/provider/domain/repositories/IProviderRepository';

export class Delete {
  constructor(private providerRepository: IProviderRepository) {}

  delete = (id: string): Promise<boolean> => {
    return this.providerRepository.delete(id);
  };
}
