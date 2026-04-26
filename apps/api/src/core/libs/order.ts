import { Create } from "@core/order/application/create";
import { Delete } from "@core/order/application/delete";
import { Find } from "@core/order/application/find";
import { Search } from "@core/order/application/search";
import { Update } from "@core/order/application/update";
import { UpdateItem } from "@core/order/application/updateItem";
import { DeleteItem } from "@core/order/application/deleteItem";
import { AddItem } from "@core/order/application/addItem";
import { OrderDrizzleRepository } from "@core/order/infrastructure/orderDrizzleRepository";
import { db } from "@database/connection";

const orderRepository = new OrderDrizzleRepository(db);

export const orderManager = {
  createOrder: new Create(orderRepository),
  updateOrder: new Update(orderRepository),
  deleteOrder: new Delete(orderRepository),
  findOrder: new Find(orderRepository),
  searchOrder: new Search(orderRepository),
  updateOrderItem: new UpdateItem(orderRepository),
  deleteOrderItem: new DeleteItem(orderRepository),
  addOrderItem: new AddItem(orderRepository),
};
