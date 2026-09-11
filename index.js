console.log("Vi kollar hur många rader det finns i test.js");
const filesync = require("fs");
const content = filesync.readFileSync("test.js", "utf8");
const rowcount = content.split("\n").length;

console.log(`Antal rader är: ${rowcount}`);

const coderowcount = content
  .split("\n")
  .filter((row) => row.trim().length > 1).length;

console.log(`Antal kodrader är: ${coderowcount}`);

let maxIndentation = 0;
let currentIndentation = 0;

for (const row of content.split("\n")) {
  const trimmedRow = row.trim();

  if (trimmedRow.length > 0) {
    currentIndentation = row.match(/^\s*/)[0].length / 4;

    if (currentIndentation > maxIndentation) {
      maxIndentation = currentIndentation;
    }
  }
}

console.log(`Maximal indrag är: ${maxIndentation}`);