import * as protobuf from "protobufjs";
import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString
} from "graphql";

const ScalarTypeMap = {
  double: GraphQLFloat,
  float: GraphQLFloat,
  int32: GraphQLInt,
  int64: GraphQLInt,
  uint32: GraphQLInt,
  uint64: GraphQLInt,
  sint32: GraphQLInt,
  sint64: GraphQLInt,
  fixed32: GraphQLInt,
  fixed64: GraphQLInt,
  sfixed32: GraphQLInt,
  sfixed64: GraphQLInt,
  bool: GraphQLBoolean,
  string: GraphQLString,
  bytes: GraphQLString
};

export function fullTypeName(type: protobuf.ReflectionObject): string {
  if (type instanceof protobuf.MapField) {
    const keyType = convertScalar(type.keyType);
    const valueType = isScalar(type.type)
      ? convertScalar(type.type)
      : fullTypeName(type.resolvedType);
    return `${keyType}_${valueType}_Map`;
  }

  return type.parent && type.parent.name
    ? `${fullTypeName(type.parent)}_${type.name}`
    : type.name;
}

export function isScalar(type: string) {
  return type in ScalarTypeMap;
}

export function convertScalar(type: string) {
  return (ScalarTypeMap as any)[type];
}

declare global {
  interface Array<T> {
    flat(): any[];
  }
}

Array.prototype.flat = function() {
  return this.reduce(function(arr: any[], flatting: any[]) {
    return arr.concat(Array.isArray(flatting) ? flatting.flat() : flatting);
  }, []);
};
