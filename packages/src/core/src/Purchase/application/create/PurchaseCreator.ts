import { Purchase, PurchaseRepository } from "../../domain";

export class PurchaseCreator {
  constructor(private respository: PurchaseRepository) { }
  async run(request: Request) {
    const data = Purchase.fromPrimitives(request);
    await this.respository.save(data);
  }
}

interface Request {
  id: string,
  dealer: string,
  batch: string,
  total: number,
  purchaseDate: Date,
  isActive: boolean,
}
