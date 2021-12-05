import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { replaceIndentByMargin } from "./replace_indent_by_margin.ts";

// Reference:
// https://github.com/JetBrains/kotlin/blob/92d200e093c693b3c06e53a39e0b0973b84c7ec5/libraries/stdlib/test/text/StringTest.kt#L1585-L1587

Deno.test({
  name: "[replaceIndentByMargin] replace",
  fn() {
    const string = `ABC
    |123
    |456`;
    const replaced = replaceIndentByMargin(string, "  ");

    assertEquals(replaced, "ABC\n  123\n  456");
  },
});
