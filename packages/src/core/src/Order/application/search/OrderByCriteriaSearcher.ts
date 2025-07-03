import { Criteria } from "../../../shared/domain/Criteria";
import { Primitives } from "../../../shared/domain/Primitives";
import { Order, OrderRepository } from "../../domain";

export class OrderByCriteriaSearher {
  constructor(private repository: OrderRepository) { }
  async run(
    request: SearchOrderByCriteriaRequest
  ): Promise<{ listOrders: Order[], total: number }> {

    const filters = request.filters || [];
    const criteria = Criteria.fromValues({ ...request, filters });

    const [ listOrders, total ] = await Promise.all([
      this.repository.matching(criteria),
      this.repository.count(criteria.filters || [])
    ])
    return {
      listOrders: listOrders,
      total
    };
  }
}

interface SearchOrderByCriteriaRequest extends Primitives<Criteria> { }
