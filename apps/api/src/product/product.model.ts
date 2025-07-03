import { Primitives } from "../../../core/src/shared/domain/Primitives";
import { builder } from "../shared/schema/builder";
import { Product } from "../../../core/src/Product/domain/Product";

export const ProductModel = builder.objectRef<Primitives<Product>>(
  "Product"
);

export const ListProductModel = builder.objectRef<{
  productList: Primitives<Product>[];
  total: number;
}>("Products");
