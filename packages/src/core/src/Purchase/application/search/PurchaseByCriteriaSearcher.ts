import { Criteria } from "../../../shared/domain/Criteria";
import { Primitives } from "../../../shared/domain/Primitives";
import { Purchase, PurchaseRepository } from "../../domain";

export class PurchaseByCriteriaSearher {
  constructor(private repository: PurchaseRepository) { }
  async run(
    request: SearchPurchaseByCriteriaRequest
  ): Promise<{ listPurchase: Purchase[], total: number }> {

    const filters = request.filters || [];
    const criteria = Criteria.fromValues({ ...request, filters });

    const [ listPurchase, total ] = await Promise.all([
      this.repository.matching(criteria),
      this.repository.count(criteria.filters || [])
    ])
    return {
      listPurchase: listPurchase,
      total
    };
  }
}

interface SearchPurchaseByCriteriaRequest extends Primitives<Criteria> { }
