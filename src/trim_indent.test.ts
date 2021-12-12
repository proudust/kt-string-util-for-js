import { assertEquals, maxOf, minOf } from "../deps.ts";
import { lines } from "./lines.ts";
import { trimIndent } from "./trim_indent.ts";

// Reference:
// https://github.com/JetBrains/kotlin/blob/92d200e093c693b3c06e53a39e0b0973b84c7ec5/libraries/stdlib/test/text/StringTest.kt#L1624-L1686

Deno.test({
  name: "[trimIndent] standard",
  fn() {
    const string = trimIndent`
    123
    `;
    assertEquals(string, "123");
  },
});

Deno.test({
  name: "[trimIndent] don't trim non-indent spaces 1",
  fn() {
    const string = trimIndent`
    123
       456
       `;
    assertEquals(string, "123\n   456");
  },
});

Deno.test({
  name: "[trimIndent] don't trim non-indent spaces 2",
  fn() {
    const string = trimIndent`
       123
    456
    `;
    assertEquals(string, "   123\n456");
  },
});

Deno.test({
  name: "[trimIndent] don't trim non-indent spaces 3",
  fn() {
    const string = trimIndent`
       123
    456`;
    assertEquals(string, "   123\n456");
  },
});

Deno.test({
  name: "[trimIndent] don't trim non-indent spaces 4",
  fn() {
    const string = trimIndent`
${"    "}
    `;
    assertEquals(string, "    ");
  },
});

Deno.test({
  name: "[trimIndent] AA",
  fn() {
    const deindented = trimIndent`
                                                            ,.
                      ,.                     _       oo.   \88P
                     ]88b              ,o.  d88.    ]88b     '
                      888   _          Y888o888     d88P     _     _
                      888 ,888          \Y88888o_  ,888    d88b   d88._____
                      888,888P ,oooooo.   ;888888b.]88P    888'   d888888888p
                      888888P d88888888.  J88b'YPP ]88b   ,888    d888P'''888.
                      8888P' ]88P   \888  d88[     d88P   ]88b    888'    Y88b
                      8888p  ]88b    888  888      d88[    888    888.    \888
                     ,88888b  888[   888  888.     d88[    888.   Y88b     Y88[
                     d88PY88b \888L,d88P  Y88b     Y88b    ]88b   \888     888'
                     888  Y88b  Y88888P    888.     888.    888.   Y88b   \88P
                    d88P   888   \'P'      Y888.    \888.   \88P   \Y8P     '
                    Y8P'    '               \YP      Y8P'     '

                    ____       dXp   _    _        _________
                  ddXXXXXp     XXP  ,XX  dXb      Yo.XXXXXX      ,oooooo.
                  X'L_oXXP     XX'   XX[ dXb      dXb            YPPPPXXX'
                  XYXXXXX     ]XX    dXb dXb      dX8Xooooo         dXXP
                  XXb\YYXXo.   YXXo_ dXP dXP      YXb''''''       ,XXP'
                  \XX   \YYXb   \YXXXXP  XX[      ]XX            ,XX'
                   YXb     YXb     \''   XXXXooL  \XX._____      \XXXXXXXXooooo.
                   \XP      '             ''''''   YPXXXXXX'       ''''''\''YPPP
    `;

    const array = lines(deindented);
    console.log(array);
    assertEquals(array.length, 23);
    const indents = array.map((x) => /^\s*/.exec(x)?.[0].length || 0);
    assertEquals(minOf(indents, (x) => x), 0);
    assertEquals(maxOf(indents, (x) => x), 42);
    assertEquals(array.filter((x) => !x).length, 1);
  },
});
