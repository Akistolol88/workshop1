const filesync = require("fs");

// Total number of lines, including blank/whitespace-only ones
function countRows(content) {
  return content.split("\n").length;
}

// Lines that count as actual code: excludes empty lines and single-character lines
function countCodeRows(content) {
  return content
    .split("\n")
    .filter((row) => row.trim().length > 1).length;
}

// Find the deepest indentation level across all non-empty lines (4 spaces = 1 level)
function findMaxIndentation(content) {
  let maxIndentation = 0;

  for (const row of content.split("\n")) {
    const trimmedRow = row.trim();

    if (trimmedRow.length > 0) {
      const currentIndentation = Math.floor(row.match(/^\s*/)[0].length / 4);
      if (currentIndentation > maxIndentation) {
        maxIndentation = currentIndentation;
      }
    }
  }

  return maxIndentation;
}

// Walk every character and track brace nesting depth to find the deepest nested block
function findMaxNestedBlockDepth(content) {
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

  // Subtract 1 so the outermost module-level scope isn't counted as a nested block
  return maxDepth - 1;
}

function main() {
  console.log("Vi kollar hur många rader det finns i test.js");

  const fileName = process.argv[2];
  const content = filesync.readFileSync(fileName, "utf8");

  console.log(`Antal rader är: ${countRows(content)}`);
  console.log(`Antal kodrader är: ${countCodeRows(content)}`);
  console.log(`Maximal indrag är: ${findMaxIndentation(content)}`);

  const maxDepth = findMaxNestedBlockDepth(content);

  if (maxDepth < 1) {
    console.log(`Det finns inga nestlade block`)
  } else {
    console.log(`Största nestade blocket är: ${maxDepth}`)
  }

  console.log(``)
}

main();
