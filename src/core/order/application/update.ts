import type { IOrderRepository } from "@core/order/domain/repositories/IOrderRepository";
import type { UpdateOrderDTO } from "@core/order/domain/DTOs/orderDTO";
import type { Order } from "@core/order/domain/entity/order";

export class Update {
  constructor(private orderRepository: IOrderRepository) {}

  update = async (id: string, data: UpdateOrderDTO): Promise<Order | null> => {
    const order = await this.orderRepository.update(id, data);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  };
}
