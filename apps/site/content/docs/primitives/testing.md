---
title: Testing
description: The checks the library holds its own components to, for a design system or a component built on them.
section: primitives
order: 8
keywords:
  [
    testing,
    faults,
    known,
    serialize,
    settled,
    recorder,
    conformance,
    vitest,
    playwright,
  ]
---

# Testing

The `testing` entry is what the library checks its own components with. It is an entry of the
package you installed (`@kirana-ui/react/testing`, `@kirana-ui/vue/testing` and so on). It runs
wherever there is a DOM: a browser test, a Playwright page, or jsdom for what needs no layout.

The components run in jsdom too. There is no Web Animations API there, so a popup opens and
closes at once, with no wait for a transition, and `settled()` waits for no animation: a test of
what a press changes needs no polyfill. Where a popup is placed, its size and what scrolls are for
a real browser to test.

```ts
import {
  faults,
  known,
  recorder,
  serialize,
  settled,
} from "@kirana-ui/react/testing"
```

| Function                         | What it does                                                                                                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `faults(root, known?, options?)` | Reads a page for what a component must never do, and lists what it finds as sentences                                                                                                           |
| `known(...definitions)`          | The vocabulary `faults` accepts: the library's own, with any components of yours added                                                                                                          |
| `serialize(root)`                | The page as text, the same for two frameworks that draw the same thing                                                                                                                          |
| `settled()`                      | Resolves once nothing is moving: no entrance, no exit, no running animation. Rejects after its `timeout` (5 seconds), saying what was still moving, and at once when it cannot look at the page |
| `recorder()`                     | Records what a change callback hears (value, reason, source), and can refuse what it is asked                                                                                                   |

## Faults

`faults` reports:

- a `data-*` attribute or a CSS variable no vocabulary names;
- a state written as a value it does not take (`data-open="false"` still matches `[data-open]`);
- a reference (`aria-controls`, `aria-labelledby`, `for`) to an id that is not in the page;
- one id on two elements.

The first of these includes your page's own `data-*` attributes, which no part wrote.
`data-testid` and the [agent bridge](/docs/ai/agent-bridge)'s marks (`data-agent-confirm`,
`data-agent-hidden`, `data-agent-secret`) are accepted as they are. Name any other in
`options.allow`, or the page always has faults:

```ts
trigger.click()
await settled()
expect(faults(document.body, known(), { allow: ["data-qa"] })).toEqual([])
```

| Option  | What it is                                                                      |
| ------- | ------------------------------------------------------------------------------- |
| `allow` | Other `data-*` attributes of the page's own, which no part wrote: `["data-qa"]` |
| `free`  | State attributes whose value may be anything: a number, a word a caller chose   |

## A component of your own

`known()` alone is the library's vocabulary. `known(definition)` returns that with a component of
yours added (a definition made with `defineComponent` from `@kirana-ui/core/authoring`). It
changes nothing by itself: pass what it returns to `faults`.

```ts
expect(faults(document.body, known(rating))).toEqual([])
```

## The same DOM on two frameworks

`serialize` is how the library proves its adapters agree: it writes one line per element with its
attributes sorted, so the same component drawn by two frameworks gives the same text whatever each
leaves behind. Use it to hold a design system's React and Vue components to one DOM.

## What a callback heard

```ts
const heard = recorder()
render(<Toggle onPressedChange={heard.listen} />)

// …press it…
expect(heard.said()).toEqual(["true press"])

heard.refuse() // from now on, every change is cancelled
```
