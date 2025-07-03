import { PurchaseDetail, PurchaseDetailRepository } from "../../domain";

export class PurchaseDetailCreator {
  constructor(private respository: PurchaseDetailRepository) { }
  async run(request: Request) {
    const data = PurchaseDetail.fromPrimitives(request);
    await this.respository.save(data);
  }
}

interface Request {
  id: string,
  productId: string;
  purchaseId: string;
  amount: number;
  totalPrice: number;
  isActive: boolean,
}
