import type { IOrderRepository } from "@core/order/domain/repositories/IOrderRepository";

export class DeleteItem {
  constructor(private orderRepository: IOrderRepository) {}

  delete = async (orderId: string, itemId: string): Promise<void> => {
    // Verify the order exists
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Verify order is in draft status
    if (order.status !== "draft") {
      throw new Error("Only orders with draft status can have their items deleted");
    }

    // Delete the item
    const deleted = await this.orderRepository.deleteOrderItem(itemId);
    if (!deleted) {
      throw new Error("Order item not found");
    }
  };
}
