import { PriceDeleter, PriceRepository } from "../../../Price";
import { ProductRepository } from "../../domain";
import { ProductId } from "../../domain/Product";

export class ProductDeleter {
  private priceDeleter: PriceDeleter;
  constructor(
    private repository: ProductRepository,
    priceRepository: PriceRepository,
  ){
    this.priceDeleter = new PriceDeleter(priceRepository)
  }
  async run (productId: string) {
    await this.repository.delete(new ProductId(productId));
    await this.priceDeleter.run(productId);
  }
}
