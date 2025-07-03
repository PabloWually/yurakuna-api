import { builder } from "../../shared/schema/builder";
import { injector } from "../product.injector";
import { ProductModel } from "../product.model";

builder.queryField("product", (t) =>
  t.field({
    type: ProductModel,
    errors: {},
    args: {
      productId: t.arg.string({required: true}),
    },
    resolve: async(_, {productId}) => {
      const test = await injector.productFinder.run(productId);
      return test.toPrimitives();
    }
  })
)
