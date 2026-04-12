import type { DeliveryStatus } from "@shared/types";

export interface CreateDeliveryItemDTO {
  orderItemId: string;
  productId: string;
  quantity: number;
}

export interface CreateDeliveryDTO {
  orderId: string;
  clientId: string;
  deliveryAddress: string;
  notes?: string;
  items: CreateDeliveryItemDTO[];
}

export interface UpdateDeliveryDTO {
  status?: DeliveryStatus;
  deliveredAt?: Date;
  notes?: string;
}
