import { DeliveryDetailRepository } from "../../domain";
import { DeliveryDetailId } from "../../domain/DeliveryDetail";

export class DeliveryDetailDeleter {
  constructor(private repository: DeliveryDetailRepository){}
  async run (deliveryDetailId: string) {
    await this.repository.delete(new DeliveryDetailId(deliveryDetailId));
  }
}
