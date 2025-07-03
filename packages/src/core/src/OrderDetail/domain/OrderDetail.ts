import { AggregateRoot } from "../../shared/domain/AggregateRoot"
import { BooleanValue } from "../../shared/domain/BooleanValue";
import { StringValue } from "../../shared/domain/StringValue";
import { Primitives } from "../..//shared/domain/Primitives";
import { Uuid } from "../../shared/domain/Uuid";
import { PositiveNumber } from "../../shared/domain/PositiveNumber";

export class OrderDetail extends AggregateRoot {
  constructor (
    readonly id: OrderDetailId,
    readonly productId: ProductId,
    readonly orderId: OrderId,
    readonly amount: Amount,
    readonly unitPrice: UnitPrice,
    readonly isActive: IsActive,
  ) {
    super();
  }

  static fromPrimitives(primitives: Primitives<OrderDetail>): OrderDetail{
    return new OrderDetail(
      new OrderDetailId(primitives.id),
      new ProductId(primitives.productId),
      new OrderId(primitives.orderId),
      new Amount(primitives.amount),
      new UnitPrice(primitives.unitPrice),
      new IsActive(primitives.isActive),
    );
  }

  toPrimitives(): Primitives<OrderDetail>{
    return{
      id: this.id.value,
      productId: this.productId.value,
      orderId: this.orderId.value,
      amount: this.amount.value,
      unitPrice: this.unitPrice.value,
      isActive: this.isActive.value,
    }
  }
}

export class OrderDetailId extends Uuid{}
class OrderId extends StringValue{}
class ProductId extends StringValue{}
class Amount extends PositiveNumber{}
class UnitPrice extends PositiveNumber{}
class IsActive extends BooleanValue{}
