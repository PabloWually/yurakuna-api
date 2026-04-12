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

export interface DeliveryItem {
  id: string;
  deliveryId: string;
  orderItemId: string;
  productId: string;
  quantity: string;
  isActive: boolean;
  createdAt: Date;
}

export interface DeliveryWithItems extends Delivery {
  items: DeliveryItem[];
}
