import type { IOrderRepository } from "@core/order/domain/repositories/IOrderRepository";
import type { OrderItem } from "@core/order/domain/entity/order";

export class AddItem {
  constructor(private orderRepository: IOrderRepository) {}

  add = async (orderId: string, productId: string, quantity: string): Promise<OrderItem | null> => {
    // Verify the order exists
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Verify order is in draft status
    if (order.status !== "draft") {
      throw new Error("Only orders with draft status can have items added");
    }

    // Add the item
    const newItem = await this.orderRepository.addOrderItem(orderId, productId, quantity);
    if (!newItem) {
      throw new Error("Failed to add item to order");
    }

    return newItem;
  };
}
