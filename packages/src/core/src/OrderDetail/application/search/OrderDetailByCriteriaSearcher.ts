import { Criteria } from "../../../shared/domain/Criteria";
import { Primitives } from "../../../shared/domain/Primitives";
import { OrderDetail, OrderDetailRepository } from "../../domain";

export class OrderDetailByCriteriaSearher {
  constructor(private repository: OrderDetailRepository) { }
  async run(
    request: SearchOrderDetailByCriteriaRequest
  ): Promise<{ listOrderDetail: OrderDetail[], total: number }> {

    const filters = request.filters || [];
    const criteria = Criteria.fromValues({ ...request, filters });

    const [ listOrderDetail, total ] = await Promise.all([
      this.repository.matching(criteria),
      this.repository.count(criteria.filters || [])
    ])
    return {
      listOrderDetail: listOrderDetail,
      total
    };
  }
}

interface SearchOrderDetailByCriteriaRequest extends Primitives<Criteria> { }
