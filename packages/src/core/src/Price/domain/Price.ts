import { AggregateRoot } from "../../shared/domain/AggregateRoot"
import { BooleanValue } from "../../shared/domain/BooleanValue";
import { PositiveNumber } from "../../shared/domain/PositiveNumber";
import { StringValue } from "../../shared/domain/StringValue";
import { Primitives } from "../..//shared/domain/Primitives";
import { Uuid } from "../../shared/domain/Uuid";

export class Price extends AggregateRoot {
  constructor (
    readonly id: PriceId,
    readonly productId: ProductId,
    readonly productPurchased: ProductPurchased,
    readonly purchaseAmount: PurchaseAmount,
    readonly productWaste: ProductWaste,
    readonly mod:MOD,
    readonly transportation: Transportation,
    readonly misellanious: Misellanious,
    readonly profit: Profit,
    readonly isActive: IsActive,
  ) {
    super();
  }

  static fromPrimitives(primitives: Primitives<Price>): Price{
    return new Price(
      new PriceId(primitives.id),
      new ProductId(primitives.productId),
      new ProductPurchased(primitives.productPurchased),
      new PurchaseAmount(primitives.purchaseAmount),
      new ProductWaste(primitives.productWaste),
      new MOD(primitives.mod),
      new Transportation(primitives.transportation),
      new Misellanious(primitives.misellanious),
      new Profit(primitives.profit),
      new IsActive(primitives.isActive),
    );
  }

  toPrimitives(): Primitives<Price>{
    return{
      id: this.id.value,
      productId: this.productId.value,
      productPurchased: this.productPurchased.value,
      purchaseAmount: this.purchaseAmount.value,
      productWaste: this.productWaste.value,
      mod: this.mod.value,
      transportation: this.transportation.value,
      misellanious: this.misellanious.value,
      profit: this.profit.value,
      isActive: this.isActive.value,
    }
  }
}

export class PriceId extends Uuid{}
export class ProductId extends StringValue{}
class ProductPurchased extends PositiveNumber{}
class PurchaseAmount extends PositiveNumber{}
class ProductWaste extends PositiveNumber{}
class MOD extends PositiveNumber{}
class Transportation extends PositiveNumber{}
class Misellanious extends PositiveNumber{}
class Profit extends PositiveNumber{}
class IsActive extends BooleanValue{}
