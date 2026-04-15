import { Create } from '@core/provider/application/create';
import { Delete } from '@core/provider/application/delete';
import { Find } from '@core/provider/application/find';
import { Search } from '@core/provider/application/search';
import { Update } from '@core/provider/application/update';
import { ProviderDrizzleRepository } from '@core/provider/infrastructure/providerDrizzleRepository';
import { getDatabase } from '@database/connection';

export const providerManager = {
  get createProvider() {
    const db = getDatabase();
    return new Create(new ProviderDrizzleRepository(db));
  },
  get updateProvider() {
    const db = getDatabase();
    return new Update(new ProviderDrizzleRepository(db));
  },
  get deleteProvider() {
    const db = getDatabase();
    return new Delete(new ProviderDrizzleRepository(db));
  },
  get findProvider() {
    const db = getDatabase();
    return new Find(new ProviderDrizzleRepository(db));
  },
  get searchProvider() {
    const db = getDatabase();
    return new Search(new ProviderDrizzleRepository(db));
  },
};
