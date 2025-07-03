import { ValueObject } from "./ValueObject";

export abstract class DateValueObject extends ValueObject<Date> {}

export class DateUTC extends DateValueObject {
  constructor(value: Date) {
    super(value);
    this.ensureIsValidDate(value);
  }

  private ensureIsValidDate(date: Date): void {
    if (isNaN(new Date(date).valueOf())) {
      throw new Error(`<${date}> no es una facha valida>`);
    }
  }
}
