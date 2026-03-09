import type { IDeliveryRepository } from "@core/delivery/domain/repositories/IDeliveryRepository";

export class Delete {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  delete = async (id: string): Promise<boolean> => {
    const delivery = await this.deliveryRepository.delete(id);
    if (!delivery) {
      throw new Error("Delivery not found");
    }
    return delivery;
  };
}
