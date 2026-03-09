import type { IDeliveryRepository } from "@core/delivery/domain/repositories/IDeliveryRepository";
import type { UpdateDeliveryDTO } from "@core/delivery/domain/DTOs/deliveryDTO";
import type { Delivery } from "@core/delivery/domain/entity/delivery";

export class Update {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  update = async (id: string, data: UpdateDeliveryDTO): Promise<Delivery | null> => {
    const delivery = await this.deliveryRepository.update(id, data);
    if (!delivery) {
      throw new Error("Delivery not found");
    }
    return delivery;
  };
}
