import { Criteria } from "../../shared/domain/Criteria";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { Nullable } from "../../shared/domain/Nullable";
import { Order, OrderId } from "./Order";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  delete(orderId: OrderId): Promise<void>;
  find(orderId: OrderId): Promise<Nullable<Order>>;
  matching(criteria: Criteria): Promise<Order[]>;
  count(filter: Filter[]): Promise<number>;
}
