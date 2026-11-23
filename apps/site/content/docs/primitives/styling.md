---
title: Styling
description: A part is styled by its element, the state attributes it writes and its CSS variables, with plain CSS, Tailwind or Kirana.
section: primitives
order: 4
keywords:
  [
    styling,
    css,
    tailwind,
    kirana,
    data attributes,
    css variables,
    vocabulary,
    state,
  ]
---

# Styling

The primitives ship no CSS and inject no styles. The whole contract between a component and your
stylesheet is three things:

- **The element.** A part renders one element, and you give it a class. (A few draw none, such as
  a popover's root and every `Portal`; a component's page says which.) The part's own role, ARIA
  and state attributes win over yours; your handlers run first.
- **State attributes.** A boolean state is an attribute that is present or absent, never
  `="false"`: `[data-open]`, `[data-disabled]`, `[data-checked]`. A state with values carries one:
  `[data-side="top"]`, `[data-orientation="vertical"]`.
- **CSS variables.** Geometry a stylesheet cannot know is written on the part as custom
  properties: `--collapsible-panel-height`, `--anchor-width`, `--available-height`,
  `--transform-origin`.

The names are Base UI's where the two have the same state, so a style written for Base UI's
attributes holds for these parts.

## The same component, three ways

Nothing in the library knows which of these you use. Each reads the same attributes and the same
variables.

<!-- ::start:tabs -->

### CSS Modules

```css title="details.module.css"
.trigger[data-panel-open] {
  font-weight: 600;
}

.panel {
  overflow: hidden;
  height: var(--collapsible-panel-height);
  transition: height 200ms ease;
}

/* What it animates in from, and out to. */
.panel[data-starting-style],
.panel[data-ending-style] {
  height: 0;
}
```

```tsx title="details.tsx"
import { Collapsible } from "@kirana-ui/react/collapsible"

import styles from "./details.module.css"

export function Details() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger className={styles.trigger}>
        Details
      </Collapsible.Trigger>
      <Collapsible.Panel className={styles.panel}>
        <p>Panel content</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
```

### Tailwind

```tsx title="details.tsx"
import { Collapsible } from "@kirana-ui/react/collapsible"

export function Details() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger className="data-panel-open:font-semibold">
        Details
      </Collapsible.Trigger>
      <Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-starting-style:h-0 data-ending-style:h-0">
        <p>Panel content</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
```

### Kirana

```tsx title="details.tsx"
import { css, props } from "@kirana-style/core"
import { Collapsible } from "@kirana-ui/react/collapsible"

const styles = {
  trigger: css({
    fontWeight: { base: "400", "[data-panel-open]": "600" },
  }),
  panel: css({
    overflow: "hidden",
    height: {
      base: "var(--collapsible-panel-height)",
      "[data-starting-style]": "0",
      "[data-ending-style]": "0",
    },
    transitionProperty: "height",
    transitionDuration: "200ms",
  }),
}

export function Details() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger {...props(styles.trigger)}>
        Details
      </Collapsible.Trigger>
      <Collapsible.Panel {...props(styles.panel)}>
        <p>Panel content</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
```

<!-- ::end:tabs -->

- **CSS Modules, or any stylesheet**: an attribute selector for a state, `var()` for a variable.
- **Tailwind**: a data variant for a state (`data-panel-open:`), an arbitrary value for a variable
  (`h-(--collapsible-panel-height)`).
- **Kirana**: a state is a condition on a value, written as its attribute selector. The parts do
  not read `sx`, so a style reaches a part through `props()`.

## What the library leaves to your design

The library writes a style only where the length is the value itself (a progress bar's width, a
panel's share). A few layouts need a line or two from the design to work at all:

| Component                   | Your design gives                                                                                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A popup with an `Arrow`     | `position: relative` on the popup, so the arrow is placed in it through its entrance and after                                                                                                |
| Resizable                   | `display: flex` on the group (`flex-direction: column` when vertical), `flex-shrink: 0` on a handle, and a panel's `overflow`. A panel's share (`flex`, with its minimums) is written for you |
| A group nested in a panel   | `min-width: 0` and `min-height: 0` on the inner group                                                                                                                                         |
| `Dialog.Viewport`           | A fixed box over the page with `overflow: auto`, the popup inside it                                                                                                                          |
| `Avatar.Image` kept mounted | Its look while `[data-loading]` and `[data-error]`: the library does not hide it                                                                                                              |
| Scroll Area                 | Where a scrollbar sits and how big its track is; the thumb's size and place are written for you                                                                                               |

An avatar's root says how its picture is doing, to style the whole of it:
`[data-image-loading-status="loaded"]`, `"loading"`, `"error"` or `"idle"`.

## The contract as data

`@kirana-ui/vocabulary` publishes every part's states and variables, generated from the
definitions the core runs on, so it cannot drift from what the parts write.

```ts
import { Popover } from "@kirana-ui/vocabulary/keys"

Popover.Popup.open // "[data-open]"
Popover.Popup.side.top // '[data-side="top"]'
```

The same data is JSON (`@kirana-ui/vocabulary/vocabulary.json`): each part with its description,
its states with their selectors, the states that never hold together, and its variables. A tool
that checks or generates styles reads that file. The library's own tests fail on any `data-*`
attribute or custom property a part writes that is not in it.
