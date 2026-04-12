import type { Provider } from '@core/provider/domain/entity/provider';
import type { CreateProviderDTO, UpdateProviderDTO } from '@core/provider/domain/DTOs/providerDTO';
import type { Criteria } from '@shared/criteria';

export interface IProviderRepository {
  findById(id: string): Promise<Provider | null>;
  findByName(name: string): Promise<Provider | null>;
  create(data: CreateProviderDTO): Promise<Provider>;
  update(id: string, data: UpdateProviderDTO): Promise<Provider | null>;
  delete(id: string): Promise<boolean>;
  search(criteria: Criteria): Promise<Provider[]>;
  count(criteria: Criteria): Promise<number>;
}
