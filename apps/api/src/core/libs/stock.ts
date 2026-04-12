import { CreateMovement } from "@core/stock/application/createMovement";
import { CreateShrinkage } from "@core/stock/application/createShrinkage";
import { ListMovements } from "@core/stock/application/listMovements";
import { ListShrinkage } from "@core/stock/application/listShrinkage";
import { StockDrizzleRepository } from "@core/stock/infrastructure/stockDrizzleRepository";
import { ProductDrizzleRepository } from "@core/product/infrastructure/productDrizzleRepository";
import { db } from "@database/connection";

export const stockManager = {
  cretateStockMovement: new CreateMovement(
    new StockDrizzleRepository(db),
    new ProductDrizzleRepository(db),
  ),
  createStockShrinkage: new CreateShrinkage(
    new StockDrizzleRepository(db),
    new ProductDrizzleRepository(db),
  ),
  listStockMovements: new ListMovements(new StockDrizzleRepository(db)),
  listStockShrinkage: new ListShrinkage(new StockDrizzleRepository(db)),
};
