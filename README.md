# kt-string-util

Kotlin-like string util functions for JavaScript/TypeScript

## Usage

### trimMargin

Trims leading whitespace characters followed by marginPrefix from every line of
a source string and removes the first and the last lines if they are blank
(notice difference blank vs empty).

```ts
import { trimMargin } from "https://raw.githubusercontent.com/proudust/kt-string-util-for-js/$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

const s = trimMargin`ABC
  |123
  |456`;

assertEquals(s, "ABC\n123\n456");
```
