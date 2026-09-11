console.log("Vi kollar hur många rader det finns i test.js");
const filesync = require("fs");
const fileName = process.argv[2];
const content = filesync.readFileSync(fileName, "utf8");
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

let maxDepth = 0;
let currentDepth = 0;

const rows = content.split("\n");

for (const row of rows) {
  for (const character of row) {
    if (character === '{') {
      currentDepth++

      if (currentDepth > maxDepth) {
        maxDepth = currentDepth
      }
    }
    if (character === '}') {
      currentDepth--
    }
  }
}
maxDepth--
if (maxDepth < 1) {
  console.log(`Det finns inga nestlade block`)
} else {
  console.log(`Storsta nestade blocket är: ${maxDepth}`)
}
