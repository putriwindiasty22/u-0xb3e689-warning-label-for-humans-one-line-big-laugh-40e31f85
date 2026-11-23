// Warning Label for Humans: One Line, Big Laugh
//
// Writes a single-line safety warning label for every human being to
// /output/entry.txt. The gate requires UTF-8 text of 1 to 160 characters,
// not only white space, so the program validates the label before writing
// and verifies the file round-trips byte-identical afterwards.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LABEL =
  "WARNING: Contents may suddenly believe they are the main character. Do not expose to mirrors, microphones, or anyone who disagrees.";

// Gate checks: length 1-160, not only white space, one line, no control
// characters. A stray newline would break the single-line requirement.
if (LABEL.length < 1 || LABEL.length > 160 || LABEL.trim().length === 0) {
  throw new Error(`Label is ${LABEL.length} characters; must be 1-160.`);
}
if (/[\n\r\t]/.test(LABEL)) {
  throw new Error("Label must be a single line with no control characters.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LABEL, "utf8");

const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LABEL) {
  throw new Error("Written entry.txt does not match the label.");
}
console.log(`Wrote ${LABEL.length}-character label to /output/entry.txt`);
