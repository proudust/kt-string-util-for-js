# kt-string-util

Kotlin-like string util functions for JavaScript/TypeScript

## Usage

### trimIndent

```ts
import { trimIndent } from "https://raw.githubusercontent.com/proudust/kt-string-util-for-js/$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

const string = trimIndent`
  ABC
  123
  456
`;

assertEquals(string, "ABC\n123\n456");
```

### trimMargin

```ts
import { trimMargin } from "https://raw.githubusercontent.com/proudust/kt-string-util-for-js/$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

const s = trimMargin`ABC
  |123
    |456`;

assertEquals(s, "ABC\n123\n456");
```
