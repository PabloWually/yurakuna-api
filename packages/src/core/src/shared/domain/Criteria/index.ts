import { Filter } from "./Filter";
import { Primitives } from "../Primitives";
import { NullablePositiveNumber } from "../NullablePositiveNumber";
import { Nullable } from "../Nullable";

export class Filters {
  readonly values: Filter[];
  constructor(values: Filter[]) {
    this.values = values;
  }

  static fromPrimitives(filters: Primitives<Filters>): Filters {
    return new Filters(
      filters.values.map(
        (filter) => new Filter(filter.field, filter.operator, filter.values)
      )
    );
  }
}

class Offset extends NullablePositiveNumber {}
class Limit extends NullablePositiveNumber {}
export class Criteria {
  constructor(
    readonly offset: Offset,
    readonly limit: Limit,
    readonly filters: Nullable<Filter[]> = []
  ) {
    this.offset = offset;
    this.limit = limit;
    this.filters = filters;
  }

  public static fromValues(values: Primitives<Criteria>): Criteria {
    return new Criteria(
      new Offset(values.offset),
      new Limit(values.limit),
      values.filters?.map(
        (filter) => new Filter(filter.field, filter.operator, filter.values)
      )
    );
  }

  public addFilter(filter: Filter) {
    this.filters?.push(filter);
  }
}
