import { Criteria } from "../../shared/domain/Criteria";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { Nullable } from "../../shared/domain/Nullable";
import { Product, ProductId } from "./Product";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  delete(productId: ProductId): Promise<void>;
  find(productId: ProductId): Promise<Nullable<Product>>;
  matching(criteria: Criteria): Promise<Product[]>;
  count(filter: Filter[]): Promise<number>;
}
