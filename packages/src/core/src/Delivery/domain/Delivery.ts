import { AggregateRoot } from "../../shared/domain/AggregateRoot"
import { Primitives } from "../..//shared/domain/Primitives";
import { Uuid } from "../../shared/domain/Uuid";
import { PositiveNumber } from "../../shared/domain/PositiveNumber";
import { DateUTC } from "../../shared/domain/DateUTC";
import { IsActive } from "../../shared/domain/IsActive";

export class Delivery extends AggregateRoot {
  constructor (
    readonly id: DeliveryId,
    readonly clientId: ClientId,
    readonly total: Total,
    readonly deliveryDate: DeliveryDate,
    readonly isActive: IsActive,
  ) {
    super();
  }

  static fromPrimitives(primitives: Primitives<Delivery>): Delivery{
    return new Delivery(
      new DeliveryId(primitives.id),
      new ClientId(primitives.clientId),
      new Total(primitives.total),
      new DeliveryDate(primitives.deliveryDate),
      new IsActive(primitives.isActive),
    );
  }

  toPrimitives(): Primitives<Delivery>{
    return{
      id: this.id.value,
      clientId: this.clientId.value,
      total: this.total.value,
      deliveryDate: this.deliveryDate.value,
      isActive: this.isActive.value,
    }
  }
}

export class DeliveryId extends Uuid{}
class ClientId extends Uuid{}
class Total extends PositiveNumber{}
class DeliveryDate extends DateUTC{}
