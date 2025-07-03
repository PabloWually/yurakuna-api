import { ValueObject } from "./ValueObject";

export class PositiveNumber extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.ensureIsPositive(value);
  }

  private ensureIsPositive(value: number): void {
    if (value < 0) {
      throw new Error(`<${value}> debe ser un número positivo.`);
    }
  }
}
