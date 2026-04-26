import type { IDeliveryRepository } from "@core/delivery/domain/repositories/IDeliveryRepository";

export class DeleteItem {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  delete = async (deliveryId: string, itemId: string): Promise<void> => {
    // Verify the delivery exists
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery) {
      throw new Error("Delivery not found");
    }

    // Verify delivery is in pending status
    if (delivery.status !== "pending") {
      throw new Error("Only deliveries with pending status can have their items deleted");
    }

    // Delete the item
    const deleted = await this.deliveryRepository.deleteDeliveryItem(itemId);
    if (!deleted) {
      throw new Error("Delivery item not found");
    }
  };
}
