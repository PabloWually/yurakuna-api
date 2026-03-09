import type { IClientRepository } from "@core/client/domain/repositories/IClientRepository";
import type { Client } from "@core/client/domain/entity/client";

export class Find {
  constructor(
    private clientRepository: IClientRepository
  ) {}

  findById = async(id: string): Promise<Client | null> => {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new Error("Client not found");
    }
    return client;
  }

  findByEmail = async(email: string): Promise<Client | null> => {
    const client = await this.clientRepository.findByEmail(email);
    if (!client) {
      throw new Error("Client not found");
    }
    return client;
  }

  findByUserId = async(userId: string): Promise<Client | null> => {
    const client = await this.clientRepository.findByUserId(userId);
    if (!client) {
      throw new Error("Client not found");
    }
    return client;
  }
}
