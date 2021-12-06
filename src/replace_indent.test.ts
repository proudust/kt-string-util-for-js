import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { replaceIndent } from "./replace_indent.ts";

// Reference:
// https://github.com/JetBrains/kotlin/blob/92d200e093c693b3c06e53a39e0b0973b84c7ec5/libraries/stdlib/test/text/StringTest.kt#L1642-L1645

Deno.test({
  name: "[replaceIndent] replace",
  fn() {
    const string = `
       123
    456
    `;
    const replaced = replaceIndent(string, "  ");
    assertEquals(replaced, "     123\n  456");
  },
});
