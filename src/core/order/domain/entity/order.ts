import type { OrderStatus } from "@shared/types";

export interface Order {
  id: string;
  clientId: string;
  status: OrderStatus;
  totalAmount: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: string;
  pricePerUnit: string;
  subtotal: string;
  createdAt: Date;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}
