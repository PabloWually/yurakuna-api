import { Create } from '@core/delivery/application/create';
import { Delete } from '@core/delivery/application/delete';
import { Find } from '@core/delivery/application/find';
import { Search } from '@core/delivery/application/search';
import { Update } from '@core/delivery/application/update';
import { DeliveryDrizzleRepository } from '@core/delivery/infrastructure/deliveryDrizzleRepository';
import { StockDrizzleRepository } from '@core/stock/infrastructure/stockDrizzleRepository';
import { ProductDrizzleRepository } from '@core/product/infrastructure/productDrizzleRepository';
import { getDatabase } from '@database/connection';

export const deliveryManager = {
  get createDelivery() {
    const db = getDatabase();
    return new Create(new DeliveryDrizzleRepository(db));
  },
  get updateDelivery() {
    const db = getDatabase();
    return new Update(
      new DeliveryDrizzleRepository(db),
      new StockDrizzleRepository(db),
      new ProductDrizzleRepository(db),
    );
  },
  get deleteDelivery() {
    const db = getDatabase();
    return new Delete(new DeliveryDrizzleRepository(db));
  },
  get findDelivery() {
    const db = getDatabase();
    return new Find(new DeliveryDrizzleRepository(db));
  },
  get searchDelivery() {
    const db = getDatabase();
    return new Search(new DeliveryDrizzleRepository(db));
  },
};
