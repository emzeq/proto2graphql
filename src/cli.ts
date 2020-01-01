import * as program from "commander";
import { convert } from "./converter";
import { writeFileSync } from "fs";

program
  .version(require("../package.json").version)
  .option("-i, --input [path]", 'path to ".proto" file')
  .option(
    "-o, --output [path]",
    'path to ".graphql" output, otherwise uses STDOUT'
  )
  .parse(process.argv);

const schema = convert(program.input);

if (program.output) {
  writeFileSync(program.output, schema);
} else {
  console.log(schema);
}
