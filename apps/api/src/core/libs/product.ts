import { Create } from "@core/product/application/create";
import { Delete } from "@core/product/application/delete";
import { Find } from "@core/product/application/find";
import { Search } from "@core/product/application/search";
import { Update } from "@core/product/application/update";
import { ProductDrizzleRepository } from "@core/product/infrastructure/productDrizzleRepository";
import { StockDrizzleRepository } from "@core/stock/infrastructure/stockDrizzleRepository";
import { getDatabase } from "@database/connection";

export const productManager = {
  get createProduct() {
    const db = getDatabase();
    return new Create(new ProductDrizzleRepository(db), new StockDrizzleRepository(db));
  },
  get updateProduct() {
    const db = getDatabase();
    return new Update(new ProductDrizzleRepository(db));
  },
  get deleteProduct() {
    const db = getDatabase();
    return new Delete(new ProductDrizzleRepository(db));
  },
  get findProduct() {
    const db = getDatabase();
    return new Find(new ProductDrizzleRepository(db));
  },
  get searchProduct() {
    const db = getDatabase();
    return new Search(new ProductDrizzleRepository(db));
  },
}
