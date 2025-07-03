import { OrderDetail, OrderDetailRepository } from "../../domain";

export class OrderDetailCreator {
  constructor(private respository: OrderDetailRepository) { }
  async run(request: Request) {
    const data = OrderDetail.fromPrimitives(request);
    await this.respository.save(data);
  }
}

interface Request {
  id: string,
  productId: string;
  orderId: string;
  amount: number;
  unitPrice: number;
  isActive: boolean,
}
