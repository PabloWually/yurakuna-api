import type { IDeliveryRepository } from "@core/delivery/domain/repositories/IDeliveryRepository";
import type { Delivery } from "@core/delivery/domain/entity/delivery";
import type { Criteria } from "@shared/criteria";

export class Search {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  search = async (
    criteria: Criteria,
  ): Promise<{ data: Delivery[]; total: number }> => {
    const [deliveries, total] = await Promise.all([
      this.deliveryRepository.search(criteria),
      this.deliveryRepository.count(criteria),
    ]);

    return {
      data: deliveries,
      total,
    };
  };
}
