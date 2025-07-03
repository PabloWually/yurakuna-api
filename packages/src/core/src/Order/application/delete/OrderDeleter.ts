import { OrderRepository } from "../../domain";
import { OrderId } from "../../domain/Order";

export class OrderDeleter {
  constructor(private repository: OrderRepository){}
  async run (orderId: string) {
    await this.repository.delete(new OrderId(orderId));
  }
}
