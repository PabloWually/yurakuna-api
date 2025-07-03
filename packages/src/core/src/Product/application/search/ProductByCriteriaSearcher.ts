import { Criteria } from "../../../shared/domain/Criteria";
import { Primitives } from "../../../shared/domain/Primitives";
import { Product, ProductRepository } from "../../domain";

export class ProductByCriteriaSearher {
  constructor(private repository: ProductRepository) { }
  async run(
    request: SearchProductByCriteriaRequest
  ): Promise<{ listProducts: Product[], total: number }> {

    const filters = request.filters || [];
    const criteria = Criteria.fromValues({ ...request, filters });

    const [ listProducts, total ] = await Promise.all([
      this.repository.matching(criteria),
      this.repository.count(criteria.filters || [])
    ])
    return {
      listProducts,
      total
    };
  }
}

interface SearchProductByCriteriaRequest extends Primitives<Criteria> { }
