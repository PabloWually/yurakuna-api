import { Create } from '@core/delivery/application/create';
import { Delete } from '@core/delivery/application/delete';
import { Find } from '@core/delivery/application/find';
import { Search } from '@core/delivery/application/search';
import { Update } from '@core/delivery/application/update';
import { UpdateItem } from '@core/delivery/application/updateItem';
import { DeleteItem } from '@core/delivery/application/deleteItem';
import { AddItem } from '@core/delivery/application/addItem';
import { DeliveryDrizzleRepository } from '@core/delivery/infrastructure/deliveryDrizzleRepository';
import { StockDrizzleRepository } from '@core/stock/infrastructure/stockDrizzleRepository';
import { ProductDrizzleRepository } from '@core/product/infrastructure/productDrizzleRepository';
import { db } from '@database/connection';

const deliveryRepository = new DeliveryDrizzleRepository(db);

export const deliveryManager = {
  createDelivery: new Create(deliveryRepository),
  updateDelivery: new Update(
    deliveryRepository,
    new StockDrizzleRepository(db),
    new ProductDrizzleRepository(db),
  ),
  deleteDelivery: new Delete(deliveryRepository),
  findDelivery: new Find(deliveryRepository),
  searchDelivery: new Search(deliveryRepository),
  updateDeliveryItem: new UpdateItem(deliveryRepository),
  deleteDeliveryItem: new DeleteItem(deliveryRepository),
  addDeliveryItem: new AddItem(deliveryRepository),
};
