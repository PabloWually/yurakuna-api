import type { Client } from "@core/client/domain/entity/client";
import type { CreateClientDTO, UpdateClientDTO } from "@core/client/domain/DTOs/clientDTO";
import type { Criteria } from "@core/shared/criteria";

export interface IClientRepository {
  findById(id: string): Promise<Client | null>;
  findByEmail(email: string): Promise<Client | null>;
  findByUserId(userId: string): Promise<Client | null>;
  create(data: CreateClientDTO): Promise<Client>;
  update(id: string, data: UpdateClientDTO): Promise<Client | null>;
  delete(id: string): Promise<boolean>;
  search(criteria: Criteria): Promise<Client[]>;
  count(criteria: Criteria): Promise<number>;
}
