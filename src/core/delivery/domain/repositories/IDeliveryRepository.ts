import type {
  Delivery,
  DeliveryDetails,
  DeliveryItem,
  DeliveryWithItems,
} from "@core/delivery/domain/entity/delivery";
import type {
  CreateDeliveryDTO,
  UpdateDeliveryDTO,
} from "@core/delivery/domain/DTOs/deliveryDTO";
import type { Criteria } from "@shared/criteria";
import type { OrderItem } from "@core/order/domain/entity/order";

export interface IDeliveryRepository {
  findById(id: string): Promise<Delivery | null>;
  findByIdWithItems(id: string): Promise<DeliveryDetails | null>;
  findByOrderId(orderId: string): Promise<Delivery | null>;
  create(data: CreateDeliveryDTO): Promise<DeliveryWithItems>;
  update(id: string, data: UpdateDeliveryDTO): Promise<Delivery | null>;
  delete(id: string): Promise<boolean>;
  search(criteria: Criteria): Promise<DeliveryDetails[]>;
  count(criteria: Criteria): Promise<number>;
  addDeliveryItem(
    deliveryId: string,
    orderItemId: string,
    productId: string,
    quantity: string,
  ): Promise<DeliveryItem | null>;
  deleteDeliveryItem(itemId: string): Promise<boolean>;
  updateDeliveryItem(
    itemId: string,
    quantity: string,
  ): Promise<DeliveryItem | null>;
}
