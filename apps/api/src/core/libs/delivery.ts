import { Create } from '@core/delivery/application/create';
import { Delete } from '@core/delivery/application/delete';
import { Find } from '@core/delivery/application/find';
import { Search } from '@core/delivery/application/search';
import { Update } from '@core/delivery/application/update';
import { DeliveryDrizzleRepository } from '@core/delivery/infrastructure/deliveryDrizzleRepository';
import { StockDrizzleRepository } from '@core/stock/infrastructure/stockDrizzleRepository';
import { ProductDrizzleRepository } from '@core/product/infrastructure/productDrizzleRepository';
import { db } from '@database/connection';

export const deliveryManager = {
  createDelivery: new Create(new DeliveryDrizzleRepository(db)),
  updateDelivery: new Update(
    new DeliveryDrizzleRepository(db),
    new StockDrizzleRepository(db),
    new ProductDrizzleRepository(db),
  ),
  deleteDelivery: new Delete(new DeliveryDrizzleRepository(db)),
  findDelivery: new Find(new DeliveryDrizzleRepository(db)),
  searchDelivery: new Search(new DeliveryDrizzleRepository(db)),
};
