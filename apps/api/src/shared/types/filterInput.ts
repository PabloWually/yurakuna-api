import { builder } from "../schema/builder";

const Operator = builder.enumType("Operator", {
  values: [
    "EQUAL",
    "NOT_EQUAL",
    "CONTAINS",
    "DATE_GTE",
    "DATE_LTE",
    "HAS_EVERY",
    "SEARCH",
    "HAS_SOME",
    "HAS",
  ] as const,
});

export const FilterInput = builder.inputType("FilterInput", {
  fields: (t) => ({
    field: t.string({ required: true }),
    operator: t.field({ type: Operator, required: true }),
    values: t.string({ required: true }),
  }),
});
