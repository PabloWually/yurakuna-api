import type { OrderStatus } from "@shared/types";

export interface CreateOrderItemDTO {
  productId: string;
  quantity: number;
}

export interface CreateOrderDTO {
  clientId: string;
  createdById: string;
  items: CreateOrderItemDTO[];
}

export interface UpdateOrderDTO {
  status?: OrderStatus;
}
