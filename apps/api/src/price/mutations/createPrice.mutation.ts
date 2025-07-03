import { builder } from "../../shared/schema/builder";
import { injector } from "../price.injector";
import { CreatePriceInput } from "../price.type";

builder.mutationField("createPrice", (t) =>
  t.field({
    type: "response",
    args: { input: t.arg({ type: CreatePriceInput, required: true }) },
    errors: {},
    resolve: async (_, {input}) => {
      try {
        await injector.priceCreator.run({
          id: input.id.toString() || "",
          productId: input.productId,
          productPurchased: input.productPurchased,
          purchaseAmount: input.purchaseAmount,
          productWaste: input.productWaste,
          mod: input.mod,
          transportation: input.transportation,
          misellanious: input.misellanious,
          profit: input.profit,
          isActive: true,
        });
        return {
          success: true,
          error: false,
        };
      } catch (e) {
        console.log(e);
        return {
          success: false,
          error: true
        }
      }
    }
  })
)
