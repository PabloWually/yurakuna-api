import { builder } from "../schema/builder";

const ErrorInterface = builder.interfaceRef<Error>("Error").implement({
  fields: (t) => ({
    message: t.exposeString("message"),
    error: t.field({
      type: "Boolean",
      resolve: () => true,
    }),
  }),
});

builder.objectType(Error, {
  name: "BaseError",
  interfaces: [ErrorInterface],
});
