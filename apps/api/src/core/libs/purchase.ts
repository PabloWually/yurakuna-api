import { Create } from '@core/purchase/application/create';
import { Delete } from '@core/purchase/application/delete';
import { Find } from '@core/purchase/application/find';
import { Search } from '@core/purchase/application/search';
import { Update } from '@core/purchase/application/update';
import { PurchaseDrizzleRepository } from '@core/purchase/infrastructure/purchaseDrizzleRepository';
import { db } from '@database/connection';

export const purchaseManager = {
  createPurchase: new Create(new PurchaseDrizzleRepository(db)),
  updatePurchase: new Update(new PurchaseDrizzleRepository(db)),
  deletePurchase: new Delete(new PurchaseDrizzleRepository(db)),
  findPurchase: new Find(new PurchaseDrizzleRepository(db)),
  searchPurchase: new Search(new PurchaseDrizzleRepository(db)),
};
