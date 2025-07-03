import { OrderDetail, OrderDetailRepository } from "../../domain";
import { OrderDetailId } from "../../domain/OrderDetail";
import { NotFoundError } from "../../../shared/domain/NotFoundError";

export class OrderDetailFinder {
  constructor(private repository: OrderDetailRepository){}
  async run(orderDetailId: string): Promise<OrderDetail>{
    const response = await this.repository.find(new OrderDetailId(orderDetailId));
    if (response) {
      return response;
    }

    throw new NotFoundError("OD no encontrado");
  }
}
