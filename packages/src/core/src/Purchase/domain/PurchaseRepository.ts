import { Criteria } from "../../shared/domain/Criteria";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { Nullable } from "../../shared/domain/Nullable";
import { Purchase, PurchaseId } from "./Purchase";

export interface PurchaseRepository {
  save(purchase: Purchase): Promise<void>;
  delete(purchaseId: PurchaseId): Promise<void>;
  find(purchaseId: PurchaseId): Promise<Nullable<Purchase>>;
  matching(criteria: Criteria): Promise<Purchase[]>;
  count(filter: Filter[]): Promise<number>;
}
