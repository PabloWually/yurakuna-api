import { ClientRepository } from "../../domain";
import { ClientId } from "../../domain/Client";

export class ClientDeleter {
  constructor(private repository: ClientRepository){}
  async run (clientId: string) {
    await this.repository.delete(new ClientId(clientId));
  }
}
