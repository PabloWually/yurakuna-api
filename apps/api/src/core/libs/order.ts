import { Create } from "@core/order/application/create";
import { Delete } from "@core/order/application/delete";
import { Find } from "@core/order/application/find";
import { Search } from "@core/order/application/search";
import { Update } from "@core/order/application/update";
import { OrderDrizzleRepository } from "@core/order/infrastructure/orderDrizzleRepository";
import { db } from "@database/connection";

export const orderManager = {
  createOrder: new Create(new OrderDrizzleRepository(db)),
  updateOrder: new Update(new OrderDrizzleRepository(db)),
  deleteOrder: new Delete(new OrderDrizzleRepository(db)),
  findOrder: new Find(new OrderDrizzleRepository(db)),
  searchOrder: new Search(new OrderDrizzleRepository(db)),
}
