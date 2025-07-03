import { Price, PriceRepository } from "../../domain";

export class PriceCreator {
  constructor(private respository: PriceRepository) { }
  async run(request: Request) {
    const data = Price.fromPrimitives(request);
    await this.respository.save(data);
  }
}

interface Request {
  id: string,
  productId: string,
  productPurchased: number,
  purchaseAmount: number,
  productWaste: number,
  mod: number,
  transportation: number,
  misellanious: number,
  profit: number,
  isActive: boolean,
}
