import { DeliveryRepository } from "../../domain";
import { DeliveryId } from "../../domain/Delivery";

export class DeliveryDeleter {
  constructor(private repository: DeliveryRepository){}
  async run (deliveryId: string) {
    await this.repository.delete(new DeliveryId(deliveryId));
  }
}
