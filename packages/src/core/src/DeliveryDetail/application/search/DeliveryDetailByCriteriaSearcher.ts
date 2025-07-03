import { Criteria } from "../../../shared/domain/Criteria";
import { Primitives } from "../../../shared/domain/Primitives";
import { DeliveryDetail, DeliveryDetailRepository } from "../../domain";

export class DeliveryDetailByCriteriaSearher {
  constructor(private repository: DeliveryDetailRepository) { }
  async run(
    request: SearchDeliveryDetailByCriteriaRequest
  ): Promise<{ listDeliveryDetail: DeliveryDetail[], total: number }> {

    const filters = request.filters || [];
    const criteria = Criteria.fromValues({ ...request, filters });

    const [ listDeliveryDetail, total ] = await Promise.all([
      this.repository.matching(criteria),
      this.repository.count(criteria.filters || [])
    ])
    return {
      listDeliveryDetail: listDeliveryDetail,
      total
    };
  }
}

interface SearchDeliveryDetailByCriteriaRequest extends Primitives<Criteria> { }
