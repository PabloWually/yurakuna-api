import { Product, ProductRepository } from "../../domain";
import { ProductId } from "../../domain/Product";
import { NotFoundError } from "../../../shared/domain/NotFoundError";

export class ProductFinder {
  constructor(private repository: ProductRepository){}
  async run(productId: string): Promise<Product>{
    const response = await this.repository.find(new ProductId(productId));
    if (response) {
      return response;
    }

    throw new NotFoundError("Producto no encontrado");
  }
}
