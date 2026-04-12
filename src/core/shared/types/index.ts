export type Role = 'admin' | 'client' | 'user';

export type OrderStatus = 'draft' | 'confirmed' | 'delivered' | 'cancelled';

export type PurchaseStatus = 'draft' | 'confirmed' | 'cancelled';

export type ProductUnit = 'g' | 'unities' | 'lb' | 'kg' | 'liters';

export type ShrinkageCause = 'damaged' | 'expired';

export type StockMovementType = 'in' | 'out' | 'adjustment' | 'shrinkage';

export type DeliveryStatus = 'pending' | 'in_transit' | 'completed' | 'failed';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
