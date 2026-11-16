---
title: Testing
description: The checks the library holds its own components to, for a design system or a component built on them.
section: primitives
order: 8
keywords:
  [
    testing,
    faults,
    serialize,
    settled,
    recorder,
    conformance,
    vitest,
    playwright,
  ]
---

# Testing

`@kirana-ui/core/testing` is what the library checks its own components with. It runs wherever
there is a DOM: a browser test, a Playwright page, or jsdom for what needs no layout.

```ts
import { faults, recorder, serialize, settled } from "@kirana-ui/core/testing"
```

| Function                | What it does                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| `faults(root)`          | Reads a page for what a component must never do, and lists what it finds                      |
| `serialize(root)`       | The page as text, the same for two frameworks that draw the same thing                        |
| `settled()`             | Resolves once nothing is moving: no entrance, no exit, no running animation                   |
| `recorder()`            | Records what a change callback hears (value, reason, source), and can refuse what it is asked |
| `known(...definitions)` | Adds the vocabulary of components of your own to what `faults` accepts                        |

`faults` reports:

- a `data-*` attribute or a CSS variable no vocabulary names;
- a state written as a value it does not take (`data-open="false"` still matches `[data-open]`);
- a reference (`aria-controls`, `aria-labelledby`, `for`) to an id that is not in the page;
- one id on two elements.

```ts
trigger.click()
await settled()
expect(faults(document.body)).toEqual([])
```

`serialize` is how the library proves its adapters agree: it writes one line per element with its
attributes sorted, so the same component drawn by two frameworks gives the same text whatever each
leaves behind. Use it to hold a design system's React and Vue components to one DOM.
