import type { IOrderRepository } from "@core/order/domain/repositories/IOrderRepository";
import type { Order, OrderDetails } from "@core/order/domain/entity/order";

export class Find {
  constructor(private orderRepository: IOrderRepository) {}

  findById = async (id: string): Promise<Order | null> => {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  };

  findByIdWithItems = async (id: string): Promise<OrderDetails | null> => {
    const order = await this.orderRepository.findByIdWithItems(id);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  };
}
