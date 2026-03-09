import type { Client} from "@core/client/domain/entity/client";
import type { UpdateClientDTO } from "@core/client/domain/DTOs/clientDTO";
import type { IClientRepository } from "@core/client/domain/repositories/IClientRepository";

export class Update {
  constructor(
    private clientRepository: IClientRepository
  ) {}

   update = async(id: string, data: UpdateClientDTO): Promise<Client | null> => {
    const client = await this.clientRepository.update(id, data);
    if (!client) {
      throw new Error("Client not found");
    }
    return client;
  }
}
