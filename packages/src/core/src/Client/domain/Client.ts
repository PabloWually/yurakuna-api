import { AggregateRoot } from "../../shared/domain/AggregateRoot"
import { BooleanValue } from "../../shared/domain/BooleanValue";
import { StringValue } from "../../shared/domain/StringValue";
import { Primitives } from "../..//shared/domain/Primitives";
import { Uuid } from "../../shared/domain/Uuid";

export class Client extends AggregateRoot {
  constructor (
    readonly id: ClientId,
    readonly name: Name,
    readonly identificator: Indentificator,
    readonly phoneNumber: PhoneNumber,
    readonly direction: Direction,
    readonly isActive: IsActive,
  ) {
    super();
  }

  static fromPrimitives(primitives: Primitives<Client>): Client{
    return new Client(
      new ClientId(primitives.id),
      new Name(primitives.name),
      new Indentificator(primitives.identificator),
      new PhoneNumber(primitives.phoneNumber),
      new Direction(primitives.direction),
      new IsActive(primitives.isActive),
    );
  }

  toPrimitives(): Primitives<Client>{
    return{
      id: this.id.value,
      name: this.name.value,
      identificator: this.identificator.value,
      phoneNumber: this.phoneNumber.value,
      direction: this.direction.value,
      isActive: this.isActive.value,
    }
  }
}

export class ClientId extends Uuid{}
class Name extends StringValue{}
class Indentificator extends StringValue{}
class PhoneNumber extends StringValue{}
class Direction extends StringValue{}
class IsActive extends BooleanValue{}
