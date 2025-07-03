import { Product, ProductRepository } from "../../domain";

export class ProductCreator {
  constructor(private respository: ProductRepository) { }
  async run(request: Request) {
    const data = Product.fromPrimitives(request);
    await this.respository.save(data);
  }
}

interface Request {
  id: string,
  name: string,
  unity: string,
  pvp: number,
  isActive: boolean,
}
