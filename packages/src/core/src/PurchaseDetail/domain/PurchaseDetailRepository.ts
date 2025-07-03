import { Criteria } from "../../shared/domain/Criteria";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { Nullable } from "../../shared/domain/Nullable";
import { PurchaseDetail, PurchaseDetailId } from "./PurchaseDetail";

export interface PurchaseDetailRepository {
  save(purchaseDetail: PurchaseDetail): Promise<void>;
  delete(purchaseDetailId: PurchaseDetailId): Promise<void>;
  find(purchaseDetailId: PurchaseDetailId): Promise<Nullable<PurchaseDetail>>;
  matching(criteria: Criteria): Promise<PurchaseDetail[]>;
  count(filter: Filter[]): Promise<number>;
}
