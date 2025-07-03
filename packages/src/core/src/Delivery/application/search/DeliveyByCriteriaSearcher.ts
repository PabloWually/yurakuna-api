import { Criteria } from "../../../shared/domain/Criteria";
import { Primitives } from "../../../shared/domain/Primitives";
import { Delivery, DeliveryRepository } from "../../domain";

  export class DeliveryByCriteriaSearher {
    constructor(private repository: DeliveryRepository) { }
    async run(
      request: SearchDeliveryByCriteriaRequest
    ): Promise<{ listDeliveries: Delivery[], total: number }> {

      const filters = request.filters || [];
      const criteria = Criteria.fromValues({ ...request, filters });

      const [ listDeliveries, total ] = await Promise.all([
        this.repository.matching(criteria),
        this.repository.count(criteria.filters || [])
      ])
      return {
        listDeliveries: listDeliveries,
        total
      };
    }
  }

interface SearchDeliveryByCriteriaRequest extends Primitives<Criteria> { }
