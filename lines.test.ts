import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { lines } from "./lines.ts";

// Reference:
// https://github.com/JetBrains/kotlin/blob/92d200e093c693b3c06e53a39e0b0973b84c7ec5/libraries/stdlib/test/text/StringTest.kt#L669-L676

Deno.test({
  name: "splitToLines",
  fn() {
    const string = "first line\rsecond line\nthird line\r\nlast line";
    const array = lines(string);

    assertEquals(array, [
      "first line",
      "second line",
      "third line",
      "last line",
    ]);

    const singleLine = "single line";
    assertEquals([singleLine], lines(singleLine));
  },
});
