import type { IClientRepository } from "@core/client/domain/repositories/IClientRepository";
import type { Client } from "@core/client/domain/entity/client";
import type { CreateClientDTO } from "@core/client/domain/DTOs/clientDTO";

export class Create {
  constructor(private clientRepository: IClientRepository) {}

  create = async(data: CreateClientDTO): Promise<Client> => {
    const client = await this.clientRepository.create(data);
    return client;
  }
}
