import { Criteria } from "../../shared/domain/Criteria";
import {
  FilterInterceptor,
  PrismaFiltersConverter,
} from "./PrismaFilterConverter";

export const PrismaCriteriaConverter = (
  criteria: Criteria,
  filterInterceptor?: FilterInterceptor
) => ({
  where: PrismaFiltersConverter(criteria.filters || [], filterInterceptor),
  skip: criteria.offset.value || undefined,
  take: criteria.limit.value || undefined,
});
