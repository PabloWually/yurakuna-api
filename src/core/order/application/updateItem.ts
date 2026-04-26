import type { IOrderRepository } from "@core/order/domain/repositories/IOrderRepository";
import type { OrderItem } from "@core/order/domain/entity/order";

export class UpdateItem {
  constructor(private orderRepository: IOrderRepository) {}

  update = async (orderId: string, itemId: string, quantity: string): Promise<OrderItem | null> => {
    // Verify the order exists
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Verify order is in draft status
    if (order.status !== "draft") {
      throw new Error("Only orders with draft status can have their items edited");
    }

    // Update the item
    const updatedItem = await this.orderRepository.updateOrderItem(itemId, quantity);
    if (!updatedItem) {
      throw new Error("Order item not found");
    }

    return updatedItem;
  };
}
