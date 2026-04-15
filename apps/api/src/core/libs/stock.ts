import { CreateMovement } from "@core/stock/application/createMovement";
import { CreateShrinkage } from "@core/stock/application/createShrinkage";
import { ListMovements } from "@core/stock/application/listMovements";
import { ListShrinkage } from "@core/stock/application/listShrinkage";
import { StockDrizzleRepository } from "@core/stock/infrastructure/stockDrizzleRepository";
import { ProductDrizzleRepository } from "@core/product/infrastructure/productDrizzleRepository";
import { getDatabase } from "@database/connection";

export const stockManager = {
  get cretateStockMovement() {
    const db = getDatabase();
    return new CreateMovement(
      new StockDrizzleRepository(db),
      new ProductDrizzleRepository(db),
    );
  },
  get createStockShrinkage() {
    const db = getDatabase();
    return new CreateShrinkage(
      new StockDrizzleRepository(db),
      new ProductDrizzleRepository(db),
    );
  },
  get listStockMovements() {
    const db = getDatabase();
    return new ListMovements(new StockDrizzleRepository(db));
  },
  get listStockShrinkage() {
    const db = getDatabase();
    return new ListShrinkage(new StockDrizzleRepository(db));
  },
};
