import type { IOrderRepository } from "@core/order/domain/repositories/IOrderRepository";

export class Delete {
  constructor(private orderRepository: IOrderRepository) {}

  delete = async (id: string): Promise<boolean> => {
    const order = await this.orderRepository.delete(id);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  };
}
