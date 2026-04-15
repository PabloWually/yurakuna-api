import { Create } from "@core/order/application/create";
import { Delete } from "@core/order/application/delete";
import { Find } from "@core/order/application/find";
import { Search } from "@core/order/application/search";
import { Update } from "@core/order/application/update";
import { OrderDrizzleRepository } from "@core/order/infrastructure/orderDrizzleRepository";
import { getDatabase } from "@database/connection";

export const orderManager = {
  get createOrder() {
    const db = getDatabase();
    return new Create(new OrderDrizzleRepository(db));
  },
  get updateOrder() {
    const db = getDatabase();
    return new Update(new OrderDrizzleRepository(db));
  },
  get deleteOrder() {
    const db = getDatabase();
    return new Delete(new OrderDrizzleRepository(db));
  },
  get findOrder() {
    const db = getDatabase();
    return new Find(new OrderDrizzleRepository(db));
  },
  get searchOrder() {
    const db = getDatabase();
    return new Search(new OrderDrizzleRepository(db));
  },
}
