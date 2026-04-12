import type { IDeliveryRepository } from "@core/delivery/domain/repositories/IDeliveryRepository";
import type { CreateDeliveryDTO } from "@core/delivery/domain/DTOs/deliveryDTO";
import type { DeliveryWithItems } from "@core/delivery/domain/entity/delivery";

export class Create {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  create = (data: CreateDeliveryDTO): Promise<DeliveryWithItems> => {
    return this.deliveryRepository.create(data);
  };
}
