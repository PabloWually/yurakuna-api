import SchemaBuilder from "@pothos/core";
import ErrorsPlugin from "@pothos/plugin-errors";
import { DateTimeResolver } from "graphql-scalars";

export const builder = new SchemaBuilder<{
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  Objects: {
    response: {
      success: boolean;
      error?: boolean;
    };
  };
  Context: {
    entityId: string;
  };
}>({
  plugins: [ErrorsPlugin],
  errorOptions: {
    defaultTypes: [Error],
  },
});

builder.objectType("response", {
  fields: (t) => ({
    success: t.exposeBoolean("success"),
    error: t.exposeBoolean("error", { nullable: true }),
  }),
});

builder.addScalarType("Date", DateTimeResolver, {});
builder.queryType({});
builder.mutationType({});
