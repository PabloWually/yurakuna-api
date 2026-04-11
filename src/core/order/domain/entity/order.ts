import type { Client } from "@core/client/domain/entity/client";
import type { OrderStatus } from "@shared/types";
import { extend } from "zod/mini";

export interface Order {
  id: string;
  clientId: string;
  status: OrderStatus;
  totalAmount: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDetails extends Order {
  items?: OrderItem[];
  itemsCount?: number;
  client: Client;
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
