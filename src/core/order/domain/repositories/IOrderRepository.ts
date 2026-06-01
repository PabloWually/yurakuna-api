import type { Order, OrderDetailCount, OrderDetails, OrderItem, OrderWithItems } from "@core/order/domain/entity/order";
import type { CreateOrderDTO, UpdateOrderDTO } from "@core/order/domain/DTOs/orderDTO";
import type { Criteria } from "@shared/criteria";

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  findByIdWithItems(id: string): Promise<OrderDetails | null>;
  create(data: CreateOrderDTO): Promise<OrderWithItems>;
  update(id: string, data: UpdateOrderDTO): Promise<Order | null>;
  delete(id: string): Promise<boolean>;
  search(criteria: Criteria): Promise<OrderDetailCount[]>;
  count(criteria: Criteria): Promise<number>;
  searchByClient(clientId: string, criteria: Criteria): Promise<Order[]>;
  countByClient(clientId: string, criteria: Criteria): Promise<number>;
  addOrderItem(
    orderId: string,
    productId: string,
    quantity: string,
  ): Promise<OrderItem | null>;
  deleteOrderItem(itemId: string): Promise<boolean>;
  updateOrderItem(
    itemId: string,
    quantity: string,
  ): Promise<OrderItem | null>
}
