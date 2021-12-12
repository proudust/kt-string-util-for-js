import { minOf } from "../deps.ts";
import { lines } from "./lines.ts";
import { getIndentFunction, reindent } from "./replace_indent_by_margin.ts";

/**
 * Detects a common minimal indent like it does trimIndent and replaces it with
 * the specified newIndent.
 *
 * Example:
 *
 * ```ts
 * import { replaceIndent } from "https://raw.githubusercontent.com/proudust/kt-string-util-for-js/$VERSION/mod.ts";
 *
 * const string = `
 *    123
 * 456
 * `;
 * const replaced = replaceIndent(string, "  ");
 *
 * assertEquals(string, "     123\n  456");
 * ```
 *
 * Reference:
 * [Kotlin's String#replaceIndent()](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/replace-indent.html)
 */
export function replaceIndent(string: string, newIndent = ""): string {
  const array = lines(string);

  const minCommonIndent = minOf(
    array.filter((x) => /\S/.test(x)).map(indentWidth),
    (x) => x,
  ) || 0;

  return reindent(
    array,
    getIndentFunction(newIndent),
    (line) => line.substr(minCommonIndent),
  );
}

function indentWidth(string: string): number {
  const index = string
    .split("")
    .findIndex((x) => /\S/.test(x));
  return index === -1 ? string.length : index;
}
