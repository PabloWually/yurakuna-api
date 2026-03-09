import type { Product } from "@core/product/domain/entity/product";
import type { CreateProductDTO, UpdateProductDTO } from "@core/product/domain/DTOs/productDTO";
import type { Criteria } from "@shared/criteria";

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  create(data: CreateProductDTO): Promise<Product>;
  update(id: string, data: UpdateProductDTO): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
  search(criteria: Criteria): Promise<Product[]>;
  count(criteria: Criteria): Promise<number>;
  updateStock(id: string, quantity: number): Promise<Product | null>;
}
