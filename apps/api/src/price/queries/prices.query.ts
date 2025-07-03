import { FilterOperator } from "../../../../core/src/shared/domain/Criteria/Filter";
import { builder } from "../../shared/schema/builder";
import { injector } from "../price.injector";
import { ListPriceModel } from "../price.model";
import { FilterInput } from "../../shared/types/filterInput";

builder.queryField("prices", (t) =>
  t.field({
    type: ListPriceModel,
    args: {
      offset: t.arg.int({ required: true }),
      limit: t.arg.int({ required: true }),
      filters: t.arg({
        type: [FilterInput],
        required: true,
        defaultValue: []
      }),
    },
    resolve: async(_, { offset, limit, filters }) => {
      const response = await injector.priceByCriteriaSearcher.run({
        filters: filters.map((filter) => ({
          ...filter,
          operator: FilterOperator[filter.operator]
        })),
        offset,
        limit
      });

      return {
        priceList: response.listPrice.map((product) => 
          product.toPrimitives()
        ),
        total: response.total,
      };
    },
  })
);
