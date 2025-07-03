import { DeliveryDetail, DeliveryDetailRepository } from "../../domain";
import { DeliveryDetailId } from "../../domain/DeliveryDetail";
import { NotFoundError } from "../../../shared/domain/NotFoundError";

export class DeliveryDetailFinder {
  constructor(private repository: DeliveryDetailRepository){}
  async run(deliveryDetailId: string): Promise<DeliveryDetail>{
    const response = await this.repository.find(new DeliveryDetailId(deliveryDetailId));
    if (response) {
      return response;
    }

    throw new NotFoundError("DD no encontrado");
  }
}
