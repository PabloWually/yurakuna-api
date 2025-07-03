import { AggregateRoot } from "../../shared/domain/AggregateRoot"
import { BooleanValue } from "../../shared/domain/BooleanValue";
import { StringValue } from "../../shared/domain/StringValue";
import { Primitives } from "../..//shared/domain/Primitives";
import { Uuid } from "../../shared/domain/Uuid";
import { PositiveNumber } from "../../shared/domain/PositiveNumber";
import { DateUTC } from "../../shared/domain/DateUTC";

export class Order extends AggregateRoot {
  constructor (
    readonly id: OrderId,
    readonly clientId: ClientId,
    readonly total: Total,
    readonly deliveredOn: DeliveredOn,
    readonly isActive: IsActive,
  ) {
    super();
  }

  static fromPrimitives(primitives: Primitives<Order>): Order{
    return new Order(
      new OrderId(primitives.id),
      new ClientId(primitives.clientId),
      new Total(primitives.total),
      new DeliveredOn(primitives.deliveredOn),
      new IsActive(primitives.isActive),
    );
  }

  toPrimitives(): Primitives<Order>{
    return{
      id: this.id.value,
      clientId: this.clientId.value,
      total: this.total.value,
      deliveredOn: this.deliveredOn.value,
      isActive: this.isActive.value,
    }
  }
}

export class OrderId extends Uuid{}
class ClientId extends StringValue{}
class Total extends PositiveNumber{}
class DeliveredOn extends DateUTC{}
class IsActive extends BooleanValue{}
