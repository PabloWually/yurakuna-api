import { Primitives } from "../../../core/src/shared/domain/Primitives";
import { builder } from "../shared/schema/builder";
import { Price } from "../../../core/src/Price/domain/";

export const PriceModel = builder.objectRef<Primitives<Price>>(
  "Price"
);

export const ListPriceModel = builder.objectRef<{
  priceList: Primitives<Price>[];
  total: number;
}>("PriceList");
