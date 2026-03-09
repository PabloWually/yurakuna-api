import type { IClientRepository } from "@core/client/domain/repositories/IClientRepository";
import type { Client } from "@core/client/domain/entity/client";
import type { Criteria } from "@core/shared/criteria";

export class Search {
  constructor(private clientRepository: IClientRepository) {}

  search = async (
    criteria: Criteria,
  ): Promise<{ clients: Client[]; total: number }> => {
    const clients = await this.clientRepository.search(criteria);
    const total = await this.clientRepository.count(criteria);

    return {
      clients,
      total,
    };
  };
}
