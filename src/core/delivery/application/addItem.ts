import type { IDeliveryRepository } from "@core/delivery/domain/repositories/IDeliveryRepository";
import type { DeliveryItem } from "@core/delivery/domain/entity/delivery";

export class AddItem {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  add = async (
    deliveryId: string,
    orderItemId: string,
    productId: string,
    quantity: string,
  ): Promise<DeliveryItem | null> => {
    // Verify the delivery exists
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery) {
      throw new Error("Delivery not found");
    }

    // Verify delivery is in pending status
    if (delivery.status !== "pending") {
      throw new Error("Only deliveries with pending status can have items added");
    }

    // Add the item
    const newItem = await this.deliveryRepository.addDeliveryItem(
      deliveryId,
      orderItemId,
      productId,
      quantity,
    );
    if (!newItem) {
      throw new Error("Failed to add item to delivery");
    }

    return newItem;
  };
}
