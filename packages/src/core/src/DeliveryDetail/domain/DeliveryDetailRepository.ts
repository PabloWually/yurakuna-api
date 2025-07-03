import { Criteria } from "../../shared/domain/Criteria";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { Nullable } from "../../shared/domain/Nullable";
import { DeliveryDetail, DeliveryDetailId } from "./DeliveryDetail";

export interface DeliveryDetailRepository {
  save(deliveryDetail: DeliveryDetail): Promise<void>;
  delete(deliveryDetailId: DeliveryDetailId): Promise<void>;
  find(deliveryDetailId: DeliveryDetailId): Promise<Nullable<DeliveryDetail>>;
  matching(criteria: Criteria): Promise<DeliveryDetail[]>;
  count(filter: Filter[]): Promise<number>;
}
