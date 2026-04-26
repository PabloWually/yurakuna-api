import { Create } from '@core/purchase/application/create';
import { Delete } from '@core/purchase/application/delete';
import { Find } from '@core/purchase/application/find';
import { Search } from '@core/purchase/application/search';
import { Update } from '@core/purchase/application/update';
import { UpdateItem } from '@core/purchase/application/updateItem';
import { DeleteItem } from '@core/purchase/application/deleteItem';
import { AddItem } from '@core/purchase/application/addItem';
import { PurchaseDrizzleRepository } from '@core/purchase/infrastructure/purchaseDrizzleRepository';
import { StockDrizzleRepository } from '@core/stock/infrastructure/stockDrizzleRepository';
import { ProductDrizzleRepository } from '@core/product/infrastructure/productDrizzleRepository';
import { db } from '@database/connection';

const purchaseRepository = new PurchaseDrizzleRepository(db);

export const purchaseManager = {
  createPurchase: new Create(purchaseRepository),
  updatePurchase: new Update(
    purchaseRepository,
    new StockDrizzleRepository(db),
    new ProductDrizzleRepository(db),
  ),
  deletePurchase: new Delete(purchaseRepository),
  findPurchase: new Find(purchaseRepository),
  searchPurchase: new Search(purchaseRepository),
  updatePurchaseItem: new UpdateItem(purchaseRepository),
  deletePurchaseItem: new DeleteItem(purchaseRepository),
  addPurchaseItem: new AddItem(purchaseRepository),
};
