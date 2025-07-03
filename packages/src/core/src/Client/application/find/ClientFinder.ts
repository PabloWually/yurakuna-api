import { Client, ClientRepository } from "../../domain";
import { ClientId } from "../../domain/Client";
import { NotFoundError } from "../../../shared/domain/NotFoundError";

export class ClientFinder {
  constructor(private repository: ClientRepository){}
  async run(clientId: string): Promise<Client>{
    const response = await this.repository.find(new ClientId(clientId));
    if (response) {
      return response;
    }

    throw new NotFoundError("Cliente no encontrado");
  }
}
