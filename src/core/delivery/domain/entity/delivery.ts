import type { DeliveryStatus } from "@shared/types";

export interface Delivery {
  id: string;
  orderId: string;
  clientId: string;
  deliveryAddress: string;
  status: DeliveryStatus;
  deliveredAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}
