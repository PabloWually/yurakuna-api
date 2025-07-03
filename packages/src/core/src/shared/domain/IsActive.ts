import { ValueObject } from "./ValueObject";

export class IsActive extends ValueObject<boolean> {
  constructor(value: boolean | undefined) {
    if (value === undefined) {
      super(true);
      return;
    }
    super(value);
  }

  static deactivated() {
    return new IsActive(false);
  }
}
