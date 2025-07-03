import { FilterOperator } from "../../../../core/src/shared/domain/Criteria/Filter";
import { builder } from "../../shared/schema/builder";
import { injector } from "../product.injector";
import { ListProductModel } from "../product.model";
import { FilterInput } from "../../shared/types/filterInput";

builder.queryField("products", (t) =>
  t.field({
    type: ListProductModel,
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
      const response = await injector.productByCriteriaSearcher.run({
        filters: filters.map((filter) => ({
          ...filter,
          operator: FilterOperator[filter.operator]
        })),
        offset,
        limit
      });

      return {
        productList: response.listProducts.map((product) => 
          product.toPrimitives()
        ),
        total: response.total,
      };
    },
  })
);
