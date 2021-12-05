import { lines } from "./lines.ts";

/**
 * Detects indent by marginPrefix as it does trimMargin and replace it with newIndent.
 *
 * Example:
 *
 * ```ts
 * import { replaceIndentByMargin } from "https://raw.githubusercontent.com/proudust/kt-string-util-for-js/$VERSION/mod.ts";
 *
 * const string = `ABC
 * |123
 * |456`;
 * const replaced = replaceIndentByMargin(string, "  ");
 *
 * assertEquals(replaced, "ABC\n  123\n  456");
 * ```
 *
 * Reference:
 * [Kotlin's String#replaceIndentByMargin()](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/replace-indent-by-margin.html)
 */
export function replaceIndentByMargin(
  string: string,
  newIndent = "",
  marginPrefix = "|",
): string {
  if (!marginPrefix) throw new Error("marginPrefix must be non-blank string.");
  const array = lines(string);

  return reindent(array, getIndentFunction(newIndent), (line) => {
    const firstNonWhitespaceIndex = line
      .split("")
      .findIndex((x) => /\S/.test(x));

    if (firstNonWhitespaceIndex === -1) return;
    if (line.startsWith(marginPrefix, firstNonWhitespaceIndex)) {
      return line.substr(firstNonWhitespaceIndex + marginPrefix.length);
    }
  });
}

/** @private */
export function getIndentFunction(indent: string): (s: string) => string {
  return !indent ? (line) => line : (line) => indent + line;
}

/** @private */
export function reindent(
  lines: string[],
  indentAddFunction: (s: string) => string,
  indentCutFunction: (s: string) => string | undefined,
): string {
  const lastIndex = lines.length - 1;
  return lines
    .map((value, index) => {
      if ((index === 0 || index === lastIndex) && /^\s+$/.test(value)) {
        return "";
      }
      const cuted = indentCutFunction(value);
      return (cuted && indentAddFunction(cuted)) ?? value;
    })
    .filter((x) => x)
    .join("\n");
}
