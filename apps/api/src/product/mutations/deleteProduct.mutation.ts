import { builder } from "../../shared/schema/builder";
import { injector } from "../product.injector";

builder.mutationField("deleteProduct", (t) =>
  t.field({
    type: "response",
    errors: {},
    args: {
      productId: t.arg.string({ required: true }),
    },
    resolve: async (_, { productId }) => {
      try {
        await injector.productDeleter.run(productId);
        return {
          error: false,
          success: true,
        };
      } catch (e) {
        return {
          error: true,
          success: false,
        };
      }

    }
  })
);
