import { Price, PriceRepository } from "../../domain";
import { NotFoundError } from "../../../shared/domain/NotFoundError";
import { ProductId } from "../../domain/Price";

export class PriceFinder {
  constructor(private repository: PriceRepository){}
  async run(productId: string): Promise<Price>{
    const response = await this.repository.find(new ProductId(productId));
    if (response) {
      return response;
    }

    throw new NotFoundError("Precio no encontrado");
  }
}
