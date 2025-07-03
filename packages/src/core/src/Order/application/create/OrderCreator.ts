import { Order, OrderRepository } from "../../domain";

export class OrderCreator {
  constructor(private respository: OrderRepository) { }
  async run(request: Request) {
    const data = Order.fromPrimitives(request);
    await this.respository.save(data);
  }
}

interface Request {
  id: string,
  clientId: string,
  total: number,
  deliveredOn: Date,
  isActive: boolean,
}
