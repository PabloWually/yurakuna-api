import { Delivery, DeliveryRepository } from "../../domain";

export class DeliveryCreator {
  constructor(private respository: DeliveryRepository) { }
  async run(request: Request) {
    const data = Delivery.fromPrimitives(request);
    await this.respository.save(data);
  }
}

interface Request {
  id: string,
  clientId: string,
  total: number,
  deliveryDate: Date,
  isActive: boolean,
}
