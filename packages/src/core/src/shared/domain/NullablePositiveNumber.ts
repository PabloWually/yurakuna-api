import { NullableValueObject } from "./NullableValueObject";

export class NullablePositiveNumber extends NullableValueObject<number> {
  constructor(value: number | null) {
    super(value);
    if (value) {
      this.ensureIsPositive(value);
    }
  }

  private ensureIsPositive(value: number): void {
    if (value < 0) {
      throw new Error(`<${value}> debe ser un número positivo.`);
    }
  }
}
