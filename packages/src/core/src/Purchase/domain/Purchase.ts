import { AggregateRoot } from "../../shared/domain/AggregateRoot"
import { BooleanValue } from "../../shared/domain/BooleanValue";
import { StringValue } from "../../shared/domain/StringValue";
import { Primitives } from "../..//shared/domain/Primitives";
import { Uuid } from "../../shared/domain/Uuid";
import { PositiveNumber } from "../../shared/domain/PositiveNumber";
import { DateUTC } from "../../shared/domain/DateUTC";

export class Purchase extends AggregateRoot {
  constructor (
    readonly id: PurchaseId,
    readonly dealer: Dealer,
    readonly batch: Batch,
    readonly total: Total,
    readonly purchaseDate: PurchaseDate,
    readonly isActive: IsActive,
  ) {
    super();
  }

  static fromPrimitives(primitives: Primitives<Purchase>): Purchase{
    return new Purchase(
      new PurchaseId(primitives.id),
      new Batch(primitives.batch),
      new Dealer(primitives.dealer),
      new Total(primitives.total),
      new PurchaseDate(primitives.purchaseDate),
      new IsActive(primitives.isActive),
    );
  }

  toPrimitives(): Primitives<Purchase>{
    return{
      id: this.id.value,
      batch: this.batch.value,
      dealer: this.dealer.value,
      total: this.total.value,
      purchaseDate: this.purchaseDate.value,
      isActive: this.isActive.value,
    }
  }
}

export class PurchaseId extends Uuid{}
class Batch extends StringValue{}
class Dealer extends StringValue{}
class Total extends PositiveNumber{}
class PurchaseDate extends DateUTC{}
class IsActive extends BooleanValue{}
