import { AggregateRoot } from "../../shared/domain/AggregateRoot"
import { BooleanValue } from "../../shared/domain/BooleanValue";
import { StringValue } from "../../shared/domain/StringValue";
import { Primitives } from "../..//shared/domain/Primitives";
import { Uuid } from "../../shared/domain/Uuid";
import { PositiveNumber } from "../../shared/domain/PositiveNumber";

export class PurchaseDetail extends AggregateRoot {
  constructor (
    readonly id: PurchaseDetailId,
    readonly productId: ProductId,
    readonly purchaseId: PuchaseId,
    readonly amount: Amount,
    readonly totalPrice: TotalPrice,
    readonly isActive: IsActive,
  ) {
    super();
  }

  static fromPrimitives(primitives: Primitives<PurchaseDetail>): PurchaseDetail{
    return new PurchaseDetail(
      new PurchaseDetailId(primitives.id),
      new ProductId(primitives.productId),
      new PuchaseId(primitives.purchaseId),
      new Amount(primitives.amount),
      new TotalPrice(primitives.totalPrice),
      new IsActive(primitives.isActive),
    );
  }

  toPrimitives(): Primitives<PurchaseDetail>{
    return{
      id: this.id.value,
      productId: this.productId.value,
      purchaseId: this.purchaseId.value,
      amount: this.amount.value,
      totalPrice: this.totalPrice.value,
      isActive: this.isActive.value,
    }
  }
}

export class PurchaseDetailId extends Uuid{}
class PuchaseId extends StringValue{}
class ProductId extends StringValue{}
class Amount extends PositiveNumber{}
class TotalPrice extends PositiveNumber{}
class IsActive extends BooleanValue{}
