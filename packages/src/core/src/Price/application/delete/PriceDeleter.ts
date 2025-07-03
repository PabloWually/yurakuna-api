import { PriceRepository } from "../../domain";
import { PriceId } from "../../domain/Price";

export class PriceDeleter {
  constructor(private repository: PriceRepository){}
  async run (priceId: string) {
    await this.repository.delete(new PriceId(priceId));
  }
}
