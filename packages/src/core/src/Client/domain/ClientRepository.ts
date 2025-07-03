import { Criteria } from "../../shared/domain/Criteria";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { Nullable } from "../../shared/domain/Nullable";
import { Client, ClientId } from "./Client";

export interface ClientRepository {
  save(product: Client): Promise<void>;
  delete(clientId: ClientId): Promise<void>;
  find(clientId: ClientId): Promise<Nullable<Client>>;
  matching(criteria: Criteria): Promise<Client[]>;
  count(filter: Filter[]): Promise<number>;
}
