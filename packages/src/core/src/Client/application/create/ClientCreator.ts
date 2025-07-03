import { Client, ClientRepository } from "../../domain";

export class ClientCreator {
  constructor(private respository: ClientRepository) { }
  async run(request: Request) {
    const data = Client.fromPrimitives(request);
    await this.respository.save(data);
  }
}

interface Request {
  id: string,
  identificator: string,
  phoneNumber: string,
  direction: string,
  name: string,
  isActive: boolean,
}
