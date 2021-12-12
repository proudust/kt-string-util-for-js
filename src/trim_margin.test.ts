import { assertEquals } from "../deps.ts";
import { trimMargin } from "./trim_margin.ts";

// Reference:
// https://github.com/JetBrains/kotlin/blob/92d200e093c693b3c06e53a39e0b0973b84c7ec5/libraries/stdlib/test/text/StringTest.kt#L1577-L1622

Deno.test({
  name: "[trimMargin] standard",
  fn() {
    const s = trimMargin`ABC
                        |123
                        |456`;

    assertEquals(s, "ABC\n123\n456");
  },
});

Deno.test({
  name: "[trimMargin] don't trim space at EOL",
  fn() {
    const s = trimMargin`ABC${" "}
      |123
      |456`;

    assertEquals(s, "ABC \n123\n456");
  },
});

Deno.test({
  name: "[trimMargin] explicit marginPrefix",
  fn() {
    const s = trimMargin("ABC\n  >>123\n  >>456", ">>");

    assertEquals(s, "ABC\n123\n456");
  },
});

Deno.test({
  name: "[trimMargin] empty",
  fn() {
    assertEquals(trimMargin``, "");
  },
});

Deno.test({
  name: "[trimMargin] space only",
  fn() {
    const string = trimMargin`
                              `;
    assertEquals(string, "");
  },
});

Deno.test({
  name: "[trimMargin] space or prefix only 1",
  fn() {
    const string = trimMargin`
                              |`;
    assertEquals(string, "");
  },
});

Deno.test({
  name: "[trimMargin] space or prefix only 2",
  fn() {
    const string = trimMargin`
                              |
                              `;
    assertEquals(string, "");
  },
});

Deno.test({
  name: "[trimMargin] don't trim space after prefix 1",
  fn() {
    const string = trimMargin`
      |    a
    `;
    assertEquals(string, "    a");
  },
});

Deno.test({
  name: "[trimMargin] don't trim space after prefix 2",
  fn() {
    const string = trimMargin`
      |    a`;
    assertEquals(string, "    a");
  },
});

Deno.test({
  name: "[trimMargin] don't trim space after prefix 3",
  fn() {
    const string = trimMargin` |    a
    `;
    assertEquals(string, "    a");
  },
});

Deno.test({
  name: "[trimMargin] don't trim space after prefix 4",
  fn() {
    const string = trimMargin` |    a`;
    assertEquals(string, "    a");
  },
});

Deno.test({
  name: "[trimMargin] don't trim prefix after not space char",
  fn() {
    assertEquals("\0|ABC", trimMargin`${"\0"}|ABC`);
  },
});
