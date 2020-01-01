import { GraphQLOutputType, GraphQLNamedType } from "graphql";

export interface Context {
  types: { [name: string]: GraphQLOutputType };
}

export function setType(type: GraphQLNamedType, context: Context) {
  context.types[type.name] = type as GraphQLOutputType;
}

export function getType(name: string, context: Context) {
  return context.types[name];
}
