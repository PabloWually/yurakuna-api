import { DeliveryDetail, DeliveryDetailRepository } from "../../domain";

export class DeliveryDetailCreator {
  constructor(private respository: DeliveryDetailRepository) { }
  async run(request: Request) {
    const data = DeliveryDetail.fromPrimitives(request);
    await this.respository.save(data);
  }
}

interface Request {
  id: string,
  productId: string;
  deliveryId: string;
  amount: number;
  unitPrice: number;
  isActive: boolean,
}
