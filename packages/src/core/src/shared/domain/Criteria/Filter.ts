export enum FilterOperator {
  EQUAL = "=",
  NOT_EQUAL = "!=",
  CONTAINS = "CONTAINS",
  DATE_GTE = "DATE_GTE",
  DATE_LTE = "DATE_LTE",
  HAS_EVERY = "HAS_EVERY",
  SEARCH = "SEARCH",
  HAS_SOME = "HAS_SOME",
  HAS = "HAS"
}

export class Filter {
  constructor(
    readonly field: string,
    readonly operator: FilterOperator,
    readonly values: string
  ) {}
  public toPrimitives() {
    return {
      field: this.field,
      operator: this.operator,
      values: this.values,
    };
  }
}
