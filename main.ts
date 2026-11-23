// Warning Label for Humans: One Line, Big Laugh
// Writes a single-line safety warning label for every human being to
// /output/entry.txt, enforcing the competition gate before writing.
//
// The gate (see RULES.txt): the output file must be UTF-8 text of 1 to 160
// characters, not only whitespace, on a single line. The label itself is
// written fresh in this session.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The label: a real printed-label ingredient list ("runs on X, Y, and Z")
// whose joke turns on the reader in the last few words.
const LABEL =
  "WARNING: This human runs on five hours of sleep, cold coffee, and the unshakable belief that it could do your job better than you.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 160;

// Gate check 1: length must be 1-160 characters (counted as code points,
// so any non-ASCII character counts once, the way a reader counts it).
const charCount = [...LABEL].length;
if (charCount < 1 || charCount > MAX_CHARS) {
  throw new Error(
    `Label is ${charCount} characters; gate requires 1-${MAX_CHARS}.`,
  );
}

// Gate check 2: exactly one line - no line breaks of any kind.
if (/[\r\n]/.test(LABEL)) {
  throw new Error("Label must be a single line with no line breaks.");
}

// Gate check 3: no control characters (a printed label has none).
// eslint-disable-next-line no-control-regex
if (/[\u0000-\u001F\u007F]/.test(LABEL)) {
  throw new Error("Label contains control characters.");
}

// Gate check 4: not only whitespace.
if (LABEL.trim().length === 0) {
  throw new Error("Label must not be only whitespace.");
}

// Write the label, then verify the written file round-trips exactly.
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LABEL, "utf8");
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== LABEL) {
  throw new Error("Round-trip check failed: written file differs from label.");
}

console.log(`Wrote ${charCount} characters to ${OUTPUT_PATH}:`);
console.log(written);
