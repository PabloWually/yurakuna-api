import type { IOrderRepository } from "@core/order/domain/repositories/IOrderRepository";
import type { Order } from "@core/order/domain/entity/order";
import type { Criteria } from "@shared/criteria";

export class Search {
  constructor(private orderRepository: IOrderRepository) {}

  search = async (
    criteria: Criteria,
  ): Promise<{ data: Order[]; total: number }> => {
    const [orders, total] = await Promise.all([
      this.orderRepository.search(criteria),
      this.orderRepository.count(criteria),
    ]);

    return {
      data: orders,
      total,
    };
  };

  searchByClient = async (
    clientId: string,
    criteria: Criteria,
  ): Promise<{ data: Order[]; total: number }> => {
    const [orders, total] = await Promise.all([
      this.orderRepository.searchByClient(clientId, criteria),
      this.orderRepository.countByClient(clientId, criteria),
    ]);

    return {
      data: orders,
      total,
    };
  };
}
