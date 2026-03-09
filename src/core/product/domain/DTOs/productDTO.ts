import type { ProductUnit } from "@shared/types";

export interface CreateProductDTO {
  name: string;
  description?: string;
  unit: ProductUnit;
  pricePerUnit: number;
  currentStock?: number;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  unit?: ProductUnit;
  pricePerUnit?: number;
  currentStock?: number;
}
