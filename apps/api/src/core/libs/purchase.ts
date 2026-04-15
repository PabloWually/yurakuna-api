import { Create } from '@core/purchase/application/create';
import { Delete } from '@core/purchase/application/delete';
import { Find } from '@core/purchase/application/find';
import { Search } from '@core/purchase/application/search';
import { Update } from '@core/purchase/application/update';
import { PurchaseDrizzleRepository } from '@core/purchase/infrastructure/purchaseDrizzleRepository';
import { StockDrizzleRepository } from '@core/stock/infrastructure/stockDrizzleRepository';
import { ProductDrizzleRepository } from '@core/product/infrastructure/productDrizzleRepository';
import { getDatabase } from '@database/connection';

export const purchaseManager = {
  get createPurchase() {
    const db = getDatabase();
    return new Create(new PurchaseDrizzleRepository(db));
  },
  get updatePurchase() {
    const db = getDatabase();
    return new Update(
      new PurchaseDrizzleRepository(db),
      new StockDrizzleRepository(db),
      new ProductDrizzleRepository(db),
    );
  },
  get deletePurchase() {
    const db = getDatabase();
    return new Delete(new PurchaseDrizzleRepository(db));
  },
  get findPurchase() {
    const db = getDatabase();
    return new Find(new PurchaseDrizzleRepository(db));
  },
  get searchPurchase() {
    const db = getDatabase();
    return new Search(new PurchaseDrizzleRepository(db));
  },
};
