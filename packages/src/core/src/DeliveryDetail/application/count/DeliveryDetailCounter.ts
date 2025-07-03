import { DeliveryDetailRepository } from "../../domain";
import { Filter } from "../../../shared/domain/Criteria/Filter";
import { Nullable } from "../../../shared/domain/Nullable";
import { Primitives } from "../../../shared/domain/Primitives";
import { Filters } from "../../../shared/domain/Criteria";

export class DeliveryDetailCounter {
  constructor(private repository: DeliveryDetailRepository) { }
  async run(request: Request): Promise<number> {
    const filters = Filters.fromPrimitives({ values: request.filters || [] });
    const total = await this.repository.count(filters.values);
    return total;
  }
}

export interface Request {
  filters: Nullable<Primitives<Filter>[]>;
}
