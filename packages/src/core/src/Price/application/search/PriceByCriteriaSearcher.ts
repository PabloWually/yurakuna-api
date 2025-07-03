import { Criteria } from "../../../shared/domain/Criteria";
import { Primitives } from "../../../shared/domain/Primitives";
import { Price, PriceRepository } from "../../domain";

export class PriceByCriteriaSearher {
  constructor(private repository: PriceRepository) { }
  async run(
    request: SearchPriceByCriteriaRequest
  ): Promise<{ listPrice: Price[], total: number }> {

    const filters = request.filters || [];
    const criteria = Criteria.fromValues({ ...request, filters });

    const [ listPrice, total ] = await Promise.all([
      this.repository.matching(criteria),
      this.repository.count(criteria.filters || [])
    ])
    return {
      listPrice,
      total
    };
  }
}

interface SearchPriceByCriteriaRequest extends Primitives<Criteria> { }
