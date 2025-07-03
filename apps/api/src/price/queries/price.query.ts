import { builder } from "../../shared/schema/builder";
import { injector } from "../price.injector";
import { PriceModel } from "../price.model";

builder.queryField("price", (t) =>
  t.field({
    type: PriceModel,
    errors: {},
    args: {
      productId: t.arg.string({required: true}),
    },
    resolve: async(_, {productId}) => {
      const product = await injector.priceFinder.run(productId);
      return product.toPrimitives();
    }
  })
)
