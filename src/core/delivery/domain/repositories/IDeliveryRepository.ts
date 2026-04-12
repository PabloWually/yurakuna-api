import type { Delivery, DeliveryWithItems } from "@core/delivery/domain/entity/delivery";
import type { CreateDeliveryDTO, UpdateDeliveryDTO } from "@core/delivery/domain/DTOs/deliveryDTO";
import type { Criteria } from "@shared/criteria";

export interface IDeliveryRepository {
  findById(id: string): Promise<Delivery | null>;
  findByIdWithItems(id: string): Promise<DeliveryWithItems | null>;
  findByOrderId(orderId: string): Promise<Delivery | null>;
  create(data: CreateDeliveryDTO): Promise<DeliveryWithItems>;
  update(id: string, data: UpdateDeliveryDTO): Promise<Delivery | null>;
  delete(id: string): Promise<boolean>;
  search(criteria: Criteria): Promise<Delivery[]>;
  count(criteria: Criteria): Promise<number>;
}
