import type { IDeliveryRepository } from "@core/delivery/domain/repositories/IDeliveryRepository";
import type { DeliveryItem } from "@core/delivery/domain/entity/delivery";

export class UpdateItem {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  update = async (deliveryId: string, itemId: string, quantity: string): Promise<DeliveryItem | null> => {
    // Verify the delivery exists
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery) {
      throw new Error("Delivery not found");
    }

    // Verify delivery is in pending status
    if (delivery.status !== "pending") {
      throw new Error("Only deliveries with pending status can have their items edited");
    }

    // Update the item
    const updatedItem = await this.deliveryRepository.updateDeliveryItem(itemId, quantity);
    if (!updatedItem) {
      throw new Error("Delivery item not found");
    }

    return updatedItem;
  };
}
