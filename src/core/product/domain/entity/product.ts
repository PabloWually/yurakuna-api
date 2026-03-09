import type { ProductUnit } from "@shared/types";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  unit: ProductUnit;
  pricePerUnit: string;
  currentStock: string;
  createdAt: Date;
  updatedAt: Date;
}
