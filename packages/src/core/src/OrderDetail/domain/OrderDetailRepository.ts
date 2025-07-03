import { Criteria } from "../../shared/domain/Criteria";
import { Filter } from "../../shared/domain/Criteria/Filter";
import { Nullable } from "../../shared/domain/Nullable";
import { OrderDetail, OrderDetailId } from "./OrderDetail";

export interface OrderDetailRepository {
  save(orderDetail: OrderDetail): Promise<void>;
  delete(orderDetailId: OrderDetailId): Promise<void>;
  find(orderDetailId: OrderDetailId): Promise<Nullable<OrderDetail>>;
  matching(criteria: Criteria): Promise<OrderDetail[]>;
  count(filter: Filter[]): Promise<number>;
}
