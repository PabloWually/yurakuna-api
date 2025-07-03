import { Criteria } from "../../shared/domain/Criteria";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { Nullable } from "../../shared/domain/Nullable";
import { Price, PriceId, ProductId } from "./Price";

export interface PriceRepository {
  save(price: Price): Promise<void>;
  delete(priceId: PriceId): Promise<void>;
  find(productId: ProductId): Promise<Nullable<Price>>;
  matching(criteria: Criteria): Promise<Price[]>;
  count(filter: Filter[]): Promise<number>;
}
