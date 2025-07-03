import { builder } from "../../shared/schema/builder";
import { injector } from "../product.injector";
import { CreateProductInput } from "../product.type";

builder.mutationField("createProduct", (t) =>
  t.field({
    type: "response",
    args: { input: t.arg({ type: CreateProductInput, required: true }) },
    errors: {},
    resolve: async (_, {input}) => {
      try {
        await injector.productCreator.run({
          id: input.id.toString() || "",
          name: input.name,
          unity: input.unity,
          pvp: input.pvp,
          isActive: true,
        });
        return {
          success: true,
          error: false,
        };
      } catch (e) {
        return {
          success: false,
          error: true
        }
      }
    }
  })
)
