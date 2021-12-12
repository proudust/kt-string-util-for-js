import { assertEquals } from "../deps.ts";
import { lines } from "./lines.ts";

// Reference:
// https://github.com/JetBrains/kotlin/blob/92d200e093c693b3c06e53a39e0b0973b84c7ec5/libraries/stdlib/test/text/StringTest.kt#L669-L676

Deno.test({
  name: "[lines] multi lines",
  fn() {
    const string = "first line\rsecond line\nthird line\r\nlast line";
    const array = lines(string);

    assertEquals(array, [
      "first line",
      "second line",
      "third line",
      "last line",
    ]);
  },
});

Deno.test({
  name: "[lines] single line",
  fn() {
    const string = "single line";
    const array = lines(string);

    assertEquals(array, [string]);
  },
});
