import { StringValueObject } from "./StringValueObject";

export class StringValue extends StringValueObject {
  constructor(value: string = "") {
    super(value || "");
  }
}
