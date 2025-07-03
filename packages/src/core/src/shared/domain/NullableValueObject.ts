import { InvalidArgumentError } from "./InvalidArgumentError";
type Primitives =
  | String
  | string
  | number
  | Boolean
  | boolean
  | Date
  | string[];

export abstract class NullableValueObject<T extends Primitives> {
  readonly value: T | null;

  constructor(value: T | null) {
    this.value = value;
    this.ensureValueIsDefined(value);
  }

  ensureValueIsDefined(value: T | null): void {
    if (value === undefined) {
      throw new InvalidArgumentError(
        `El valor debe ser definido ${this.constructor.name}`
      );
    }
  }

  equals(other: NullableValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }
}
