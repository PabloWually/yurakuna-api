import { Delivery, DeliveryRepository } from "../../domain";
import { DeliveryId } from "../../domain/Delivery";
import { NotFoundError } from "../../../shared/domain/NotFoundError";

export class DeliveryFinder {
  constructor(private repository: DeliveryRepository){}
  async run(deliveryId: string): Promise<Delivery>{
    const response = await this.repository.find(new DeliveryId(deliveryId));
    if (response) {
      return response;
    }

    throw new NotFoundError("Compra no encontrado");
  }
}
