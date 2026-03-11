import { Create } from "@core/product/application/create";
import { Delete } from "@core/product/application/delete";
import { Find } from "@core/product/application/find";
import { Search } from "@core/product/application/search";
import { Update } from "@core/product/application/update";
import { ProductDrizzleRepository } from "@core/product/infrastructure/productDrizzleRepository";
import { db } from "@database/connection";

export const productManager = {
  createProduct: new Create(new ProductDrizzleRepository(db)),
  updateProduct: new Update(new ProductDrizzleRepository(db)),
  deleteProduct: new Delete(new ProductDrizzleRepository(db)),
  findProduct: new Find(new ProductDrizzleRepository(db)),
  searchProduct: new Search(new ProductDrizzleRepository(db)),
}
