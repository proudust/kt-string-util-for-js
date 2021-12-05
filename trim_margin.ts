import { replaceIndentByMargin } from "./replace_indent_by_margin.ts";

/**
 * Trims leading whitespace characters followed by marginPrefix from every line
 * of a source string and removes the first and the last lines if they are blank
 * (notice difference blank vs empty).
 *
 * Doesn't affect a line if it doesn't contain marginPrefix except the first and the last blank lines.
 *
 * Doesn't preserve the original line endings.
 *
 * Example:
 *
 * ```ts
 * import { trimMargin } from "https://raw.githubusercontent.com/proudust/kt-string-util-for-js/$VERSION/mod.ts";
 *
 * const s = trimMargin`ABC
 *   |123
 *   |456`;
 *
 * assertEquals(s, "ABC\n123\n456");
 * ```
 *
 * Reference:
 * [Kotlin's String#trimMargin()](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/trim-margin.html)
 */
export function trimMargin(
  template: { raw: readonly string[] | ArrayLike<string> },
  ...substitutions: unknown[]
): string;

/**
 * Trims leading whitespace characters followed by marginPrefix from every line
 * of a source string and removes the first and the last lines if they are blank
 * (notice difference blank vs empty).
 *
 * Doesn't affect a line if it doesn't contain marginPrefix except the first and the last blank lines.
 *
 * Doesn't preserve the original line endings.
 *
 * Example:
 *
 * ```ts
 * import { trimMargin } from "https://raw.githubusercontent.com/proudust/kt-string-util-for-js/$VERSION/mod.ts";
 *
 * const s = trimMargin("ABC\n  >>123\n  >>456", ">>");
 *
 * assertEquals(s, "ABC\n123\n456");
 * ```
 *
 * Reference:
 * [Kotlin's String#trimMargin()](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/trim-margin.html)
 */
export function trimMargin(string: string, marginPrefix?: string): string;

export function trimMargin(
  arg1: string | { raw: readonly string[] | ArrayLike<string> },
  arg2: string | unknown,
  ...args: unknown[]
) {
  const isString = typeof arg1 === "string";
  const string = isString ? arg1 : templateToString(arg1, arg2, ...args);
  const marginPrefix = (isString && String(arg2)) || "|";
  return replaceIndentByMargin(string, "", marginPrefix);
}

/** @private */
export function templateToString(
  template: { raw: readonly string[] | ArrayLike<string> },
  ...substitutions: unknown[]
): string {
  return Array.from(template.raw).reduce(
    (str, literal) => (str += literal + (substitutions.shift() ?? "")),
    "",
  );
}
