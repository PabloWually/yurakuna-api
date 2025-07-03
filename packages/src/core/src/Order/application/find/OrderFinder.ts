import { Order, OrderRepository } from "../../domain";
import { OrderId } from "../../domain/Order";
import { NotFoundError } from "../../../shared/domain/NotFoundError";

export class OrderFinder {
  constructor(private repository: OrderRepository){}
  async run(orderId: string): Promise<Order>{
    const response = await this.repository.find(new OrderId(orderId));
    if (response) {
      return response;
    }

    throw new NotFoundError("Orden no encontrado");
  }
}
