import {IParseOptions, Root} from "protobufjs";
import * as path from "path";
import { visit } from "./visitor";
import { printType } from "graphql";

export function convert(filename: string, options: IParseOptions) {
  const root = new Root();
  const protosDir = path.join(__dirname, "..", "protos");
  const defaultResolver = root.resolvePath;

  // Provide resolver for protobuf's well-known types
  root.resolvePath = function(origin, target) {
    if (target.startsWith("google/protobuf/")) {
      return path.join(protosDir, target);
    }
    return defaultResolver(origin, target);
  };

  root.loadSync(filename, options);
  const types = visit(root.nestedArray);
  return types.map(type => printType(type)).join("\n");
}
