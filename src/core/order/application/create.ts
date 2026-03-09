import type { IOrderRepository } from "@core/order/domain/repositories/IOrderRepository";
import type { CreateOrderDTO } from "@core/order/domain/DTOs/orderDTO";
import type { OrderWithItems } from "@core/order/domain/entity/order";

export class Create {
  constructor(private orderRepository: IOrderRepository) {}

  create = (data: CreateOrderDTO): Promise<OrderWithItems> => {
    return this.orderRepository.create(data);
  };
}
