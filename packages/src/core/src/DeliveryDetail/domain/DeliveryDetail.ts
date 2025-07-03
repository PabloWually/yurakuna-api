import { AggregateRoot } from "../../shared/domain/AggregateRoot"
import { BooleanValue } from "../../shared/domain/BooleanValue";
import { StringValue } from "../../shared/domain/StringValue";
import { Primitives } from "../..//shared/domain/Primitives";
import { Uuid } from "../../shared/domain/Uuid";
import { PositiveNumber } from "../../shared/domain/PositiveNumber";

export class DeliveryDetail extends AggregateRoot {
  constructor (
    readonly id: DeliveryDetailId,
    readonly productId: ProductId,
    readonly deliveryId: DeliveryId,
    readonly amount: Amount,
    readonly unitPrice: UnitPrice,
    readonly isActive: IsActive,
  ) {
    super();
  }

  static fromPrimitives(primitives: Primitives<DeliveryDetail>): DeliveryDetail{
    return new DeliveryDetail(
      new DeliveryDetailId(primitives.id),
      new ProductId(primitives.productId),
      new DeliveryId(primitives.deliveryId),
      new Amount(primitives.amount),
      new UnitPrice(primitives.unitPrice),
      new IsActive(primitives.isActive),
    );
  }

  toPrimitives(): Primitives<DeliveryDetail>{
    return{
      id: this.id.value,
      productId: this.productId.value,
      deliveryId: this.deliveryId.value,
      amount: this.amount.value,
      unitPrice: this.unitPrice.value,
      isActive: this.isActive.value,
    }
  }
}

export class DeliveryDetailId extends Uuid{}
class DeliveryId extends StringValue{}
class ProductId extends StringValue{}
class Amount extends PositiveNumber{}
class UnitPrice extends PositiveNumber{}
class IsActive extends BooleanValue{}
