/**
 * Splits it string to a list of lines delimited by any of following string: CRLF, LF or CR.
 *
 * Example:
 *
 * ```ts
 * import { lines } from "https://raw.githubusercontent.com/proudust/kt-string-util-for-js/$VERSION/lines.ts";
 *
 * const string = "first line\rsecond line\nthird line\r\nlast line";
 * const array = lines(string);
 *
 * assertEquals(array, [
 *   "first line",
 *   "second line",
 *   "third line",
 *   "last line",
 * ]);
 * ```
 *
 * Reference:
 * [Kotlin's CharSequence#lines()](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/lines.html)
 */
export function lines(string: string): string[] {
  return string.split(/\r\n?|\n/);
}
