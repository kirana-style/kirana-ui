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

- **The element.** A part renders one element, and you give it a class. The part's own attributes
  win over yours; your handlers run first.
- **State attributes.** A boolean state is an attribute that is present or absent, never
  `="false"`: `[data-open]`, `[data-disabled]`, `[data-checked]`. A state with values carries one:
  `[data-side="top"]`, `[data-orientation="vertical"]`.
- **CSS variables.** Geometry a stylesheet cannot know is written on the part as custom
  properties: `--collapsible-panel-height`, `--anchor-width`, `--available-height`,
  `--transform-origin`.

The names are Base UI's where the two have the same state, so a style written for Base UI's
attributes holds for these parts.

## Plain CSS

```css
.popup {
  transform-origin: var(--transform-origin);
  max-height: var(--available-height);
}
.popup[data-side="top"] {
  margin-bottom: 4px;
}
.item[data-highlighted] {
  background: Highlight;
}
```

## Tailwind

Tailwind's data variants read the same attributes:

```html
<div
  class="data-[side=top]:mb-1 data-[highlighted]:bg-accent max-h-(--available-height)"
></div>
```

## Kirana

In Kirana a state is a condition on a style's value, and the conditions are these same attribute
selectors. The components on this site are styled that way; a set of them built on the primitives,
with typed state keys read from the vocabulary below, is what comes next here.

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
