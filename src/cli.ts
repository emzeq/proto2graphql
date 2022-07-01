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
  .option("-k, --keep-case","Keeps field casing instead of converting to camel case", false)
  .option("-a, --alternate-comment-mode","Recognize double-slash comments in addition to doc-block comments", false)
  .option("-p, --prefer-trailing-comment","Use trailing comment when both leading comment and trailing comment exist", false)
  .parse(process.argv);

const loadSyncOptions = {
  keepCase: program.keepCase,
  alternateCommentMode: program.alternateCommentMode,
  preferTrailingComment: program.preferTrailingComment,
}

const schema = convert(program.input, loadSyncOptions);

if (program.output) {
  writeFileSync(program.output, schema);
} else {
  console.log(schema);
}
