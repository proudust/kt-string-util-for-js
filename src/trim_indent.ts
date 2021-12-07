import { replaceIndent } from "./replace_indent.ts";
import { templateToString } from "./trim_margin.ts";

/**
 * Detects a common minimal indent of all the input lines, removes it from every
 * line and also removes the first and the last lines if they are blank
 * (notice difference blank vs empty).
 *
 * Note that blank lines do not affect the detected indent level.
 *
 * In case if there are non-blank lines with no leading whitespace characters
 * (no indent at all) then the common indent is 0, and therefore this function
 * doesn't change the indentation.
 *
 * Doesn't preserve the original line endings.
 *
 * Example:
 *
 * ```ts
 * import { trimIndent } from "https://raw.githubusercontent.com/proudust/kt-string-util-for-js/$VERSION/mod.ts";
 *
 * const string = trimIndent`
 *   123
 * `;
 *
 * assertEquals(string, "123");
 * ```
 *
 * Reference:
 * [Kotlin's String#trimMargin()](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/trim-margin.html)
 */
export function trimIndent(
  template: { raw: readonly string[] | ArrayLike<string> },
  ...substitutions: unknown[]
): string;

/**
 * Detects a common minimal indent of all the input lines, removes it from every
 * line and also removes the first and the last lines if they are blank
 * (notice difference blank vs empty).
 *
 * Note that blank lines do not affect the detected indent level.
 *
 * In case if there are non-blank lines with no leading whitespace characters
 * (no indent at all) then the common indent is 0, and therefore this function
 * doesn't change the indentation.
 *
 * Doesn't preserve the original line endings.
 *
 * Example:
 *
 * ```ts
 * import { trimIndent } from "https://raw.githubusercontent.com/proudust/kt-string-util-for-js/$VERSION/mod.ts";
 *
 * const string = `
 *   123
 * `;
 * const replaced = trimIndent(string);
 *
 * assertEquals(string, "123");
 * ```
 *
 * Reference:
 * [Kotlin's String#trimIndent()](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/trim-indent.html)
 */
export function trimIndent(string: string): string;

export function trimIndent(
  arg1: string | { raw: readonly string[] | ArrayLike<string> },
  ...args: unknown[]
) {
  const isString = typeof arg1 === "string";
  const string = isString ? arg1 : templateToString(arg1, ...args);
  return replaceIndent(string, "");
}
