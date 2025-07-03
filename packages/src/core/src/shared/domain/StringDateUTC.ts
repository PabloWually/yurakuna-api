import { StringValueObject } from "./StringValueObject";

export class StringDateUTC extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidDate(value);
  }

  private ensureIsValidDate(date: string): void {
    if (isNaN(new Date(date).valueOf())) {
      throw new Error(`<${date}> no es una facha valida>`);
    }
  }
}
