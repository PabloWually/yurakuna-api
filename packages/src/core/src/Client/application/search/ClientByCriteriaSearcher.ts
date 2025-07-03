import { Criteria } from "../../../shared/domain/Criteria";
import { Primitives } from "../../../shared/domain/Primitives";
import { Client, ClientRepository } from "../../domain";

export class ClientByCriteriaSearher {
  constructor(private repository: ClientRepository) { }
  async run(
    request: SearchClientByCriteriaRequest
  ): Promise<{ listClients: Client[], total: number }> {

    const filters = request.filters || [];
    const criteria = Criteria.fromValues({ ...request, filters });

    const [ listClients, total ] = await Promise.all([
      this.repository.matching(criteria),
      this.repository.count(criteria.filters || [])
    ])
    return {
      listClients: listClients,
      total
    };
  }
}

interface SearchClientByCriteriaRequest extends Primitives<Criteria> { }
