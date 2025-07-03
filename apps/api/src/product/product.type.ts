import { PriceType } from "../price/price.type";
import { injector as priceInjector} from "../price/price.injector";
import { builder } from "../shared/schema/builder";
import { ListProductModel, ProductModel } from "./product.model";

export const CreateProductInput = builder.inputType("CreateProductInput", {
  fields: (t) => ({
    id: t.id({required: true}),
    name: t.string({required: true}),
    unity: t.string({required: true}),
    pvp: t.float({required: true}),
    isActive: t.boolean({required: true}),
  })
})

export const ProductType = builder.objectType(ProductModel, {
  fields: (t) => {
    return {
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      unity: t.exposeString("unity"),
      pvp: t.exposeFloat("pvp"),
      isActive: t.exposeBoolean("isActive"),
      price: t.field({
        type: PriceType,
        resolve: async (root) => {
          const price = await priceInjector.priceFinder.run(root.id);
          return price.toPrimitives();
        }
      })
    }
  }
});

export const ProductsType = builder.objectType(ListProductModel, {
  fields: (t) => ({
    products: t.field({
      type: t.listRef(ProductType),
      resolve: (root) => root.productList,
    }),
    total: t.exposeInt("total"),
  }),
});
