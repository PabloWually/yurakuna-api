import { OrderDetailRepository } from "../../domain";
import { OrderDetailId } from "../../domain/OrderDetail";

export class OrderDetailDeleter {
  constructor(private repository: OrderDetailRepository){}
  async run (orderDetailId: string) {
    await this.repository.delete(new OrderDetailId(orderDetailId));
  }
}
