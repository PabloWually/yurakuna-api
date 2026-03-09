import type { DeliveryStatus } from "@shared/types";

export interface CreateDeliveryDTO {
  orderId: string;
  clientId: string;
  deliveryAddress: string;
  notes?: string;
}

export interface UpdateDeliveryDTO {
  status?: DeliveryStatus;
  deliveredAt?: Date;
  notes?: string;
}
