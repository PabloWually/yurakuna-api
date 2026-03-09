import type { IDeliveryRepository } from "@core/delivery/domain/repositories/IDeliveryRepository";
import type { Delivery } from "@core/delivery/domain/entity/delivery";

export class Find {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  findById = async (id: string): Promise<Delivery | null> => {
    const delivery = await this.deliveryRepository.findById(id);
    if (!delivery) {
      throw new Error("Delivery not found");
    }
    return delivery;
  };

  findByOrderId = async (orderId: string): Promise<Delivery | null> => {
    const delivery = await this.deliveryRepository.findByOrderId(orderId);
    if (!delivery) {
      throw new Error("Delivery not found");
    }
    return delivery;
  };
}
