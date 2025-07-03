import { AggregateRoot } from "../../shared/domain/AggregateRoot"
import { BooleanValue } from "../../shared/domain/BooleanValue";
import { PositiveNumber } from "../../shared/domain/PositiveNumber";
import { StringValue } from "../../shared/domain/StringValue";
import { Primitives } from "../..//shared/domain/Primitives";
import { Uuid } from "../../shared/domain/Uuid";

export class Product extends AggregateRoot {
  constructor (
    readonly id: ProductId,
    readonly name: Name,
    readonly unity: Unity,
    readonly pvp: PVP,
    readonly isActive: IsActive,
  ) {
    super();
  }

  static fromPrimitives(primitives: Primitives<Product>): Product{
    return new Product(
      new ProductId(primitives.id),
      new Name(primitives.name),
      new Unity(primitives.unity),
      new PVP(primitives.pvp),
      new IsActive(primitives.isActive),
    );
  }

  toPrimitives(): Primitives<Product>{
    return{
      id: this.id.value,
      name: this.name.value,
      unity: this.unity.value,
      pvp: this.pvp.value,
      isActive: this.isActive.value,
    }
  }
}

export class ProductId extends Uuid{}
class Name extends StringValue{}
class Unity extends StringValue{}
class PVP extends PositiveNumber{}
class IsActive extends BooleanValue{}
