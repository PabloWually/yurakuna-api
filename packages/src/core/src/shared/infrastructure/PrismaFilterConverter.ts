import { Filter, FilterOperator } from "../domain/Criteria/Filter";

export interface FilterInterceptor {
  fields: string[];
  converter: (
    filter: Filter
  ) => { [x: string]: string | number | Object } | void;
}

const FilterConverter = (
  filter: Filter,
  filterInterceptor?: FilterInterceptor
) => {
  if (filterInterceptor?.fields.includes(filter.field)) {
    return filterInterceptor.converter(filter);
  }
  switch (filter.operator) {
    case FilterOperator.EQUAL:
      return { [filter.field]: filter.values };
    case FilterOperator.NOT_EQUAL:
      return {
        [filter.field]: {
          not: filter.values,
        },
      };
    case FilterOperator.CONTAINS:
      return {
        [filter.field]: {
          contains: filter.values,
        },
      };
    case FilterOperator.HAS_EVERY:
      return {
        [filter.field]: {
          hasEvery: [filter.values],
        },
      };
    case FilterOperator.HAS_SOME:
      const value = filter.values.split(',')
      return {
        [filter.field]: {
          hasSome: value,
        },
      };
    case FilterOperator.HAS:
      return {
        [filter.field]: {
          has: filter.values,
        },
      };
    
  }
};

const FilterConverterDates = (filter: Filter[] = []) => {
  const filterDates = filter.filter(
    ({ operator }) =>
      operator === FilterOperator.DATE_GTE ||
      operator === FilterOperator.DATE_LTE
  );

  return filterDates.reduce((acc: any, { field, operator, values }) => {
    const currentField = acc[field] || {};
    const operatorParsed = operator === FilterOperator.DATE_GTE ? "gte" : "lte";
    return {
      ...acc,
      [field]: {
        ...currentField,
        [operatorParsed]: new Date(values as string),
      },
    };
  }, {});
};

export const PrismaFiltersConverter = (
  filters?: Filter[],
  filterInterceptor?: FilterInterceptor
) => {
  const defaultFilter = {
    isActive: true,
    ...FilterConverterDates(filters),
  };

  if (!filters) {
    return defaultFilter;
  }

  return filters.reduce(
    (acc, filter) => ({
      ...acc,
      ...FilterConverter(filter, filterInterceptor),
    }),
    defaultFilter
  );
};
