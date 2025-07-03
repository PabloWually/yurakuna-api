import { Criteria } from "../../../shared/domain/Criteria";
import { Primitives } from "../../../shared/domain/Primitives";
import { PurchaseDetail, PurchaseDetailRepository } from "../../domain";

export class PurchaseDetailByCriteriaSearher {
  constructor(private repository: PurchaseDetailRepository) { }
  async run(
    request: SearchPurchaseDetailByCriteriaRequest
  ): Promise<{ listPurchaseDetail: PurchaseDetail[], total: number }> {

    const filters = request.filters || [];
    const criteria = Criteria.fromValues({ ...request, filters });

    const [ listPurchaseDetail, total ] = await Promise.all([
      this.repository.matching(criteria),
      this.repository.count(criteria.filters || [])
    ])
    return {
      listPurchaseDetail: listPurchaseDetail,
      total
    };
  }
}

interface SearchPurchaseDetailByCriteriaRequest extends Primitives<Criteria> { }
