import { Criteria } from "../../shared/domain/Criteria";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { Nullable } from "../../shared/domain/Nullable";
import { Delivery, DeliveryId } from "./Delivery";

export interface DeliveryRepository {
  save(delivery: Delivery): Promise<void>;
  delete(deliveryId: DeliveryId): Promise<void>;
  find(deliveryId: DeliveryId): Promise<Nullable<Delivery>>;
  matching(criteria: Criteria): Promise<Delivery[]>;
  count(filter: Filter[]): Promise<number>;
}
