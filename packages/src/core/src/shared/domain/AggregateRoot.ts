import { Primitives } from "./Primitives";
import { Uuid } from "./Uuid";

export abstract class AggregateRoot {
  // abstract readonly id: Uuid;
  abstract toPrimitives<T>(): Primitives<any>;
}
