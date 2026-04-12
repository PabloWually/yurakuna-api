import { Create } from '@core/provider/application/create';
import { Delete } from '@core/provider/application/delete';
import { Find } from '@core/provider/application/find';
import { Search } from '@core/provider/application/search';
import { Update } from '@core/provider/application/update';
import { ProviderDrizzleRepository } from '@core/provider/infrastructure/providerDrizzleRepository';
import { db } from '@database/connection';

export const providerManager = {
  createProvider: new Create(new ProviderDrizzleRepository(db)),
  updateProvider: new Update(new ProviderDrizzleRepository(db)),
  deleteProvider: new Delete(new ProviderDrizzleRepository(db)),
  findProvider: new Find(new ProviderDrizzleRepository(db)),
  searchProvider: new Search(new ProviderDrizzleRepository(db)),
};
