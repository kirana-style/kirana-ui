---
title: How the styles are built
description: One style module per component, every design compiled ahead of time, and a design that is only attributes on html.
section: kirana
order: 1
keywords:
  [
    kirana,
    architecture,
    css-in-js,
    compiled,
    style module,
    design system,
    attributes,
  ]
---

# How the styles are built

shadcn/ui writes its components in Tailwind classes and its styles as CSS. kirana/ui
writes them as typed styles next to the components, which
[Kirana](https://github.com/kirana-style/kirana) compiles at build time into one
plain stylesheet. Nothing styles a page at runtime.

## A component and its style module

Each component is two files. The markup, per framework and headless library
(`button.tsx` on Base UI, on React Aria, `Button.vue` on Ark UI), holds no style
values. Its look is a style module, written once for all of them:

```ts
// separator.styles.ts, as the registry writes it
import { css } from "@kirana-style/core"

import { orientation, when } from "../core/states"
import { theme } from "../core/tokens"

export const separator = css({
  flexShrink: 0,
  backgroundColor: theme.border,
  height: { ...when(orientation.horizontal, "1px") },
  width: {
    ...when(orientation.horizontal, "100%"),
    ...when(orientation.vertical, "1px"),
  },
})
```

`css()` returns a style handle, and an element takes it as `sx`, which Kirana turns
into its `className`:

```tsx
<div data-slot="separator" {...props} sx={[separator, sx]} />
```

A caller's `sx` comes last and wins, property by property. There is no `cn` and no
class merging: Kirana merges entries by property and condition, so an override is
never ambiguous.

## One state, every library

Base UI, React Aria and Ark UI each name a state differently: Base UI writes
`data-orientation="vertical"` on a separator, React Aria `aria-orientation`.
`when(state, value)` writes the value under every library's key at once, and a
component built on one library only ever carries that library's attributes. The
module you install keeps only your library's keys, written out.

## The design is attributes on html

Every axis of the design is an attribute on `<html>`: `data-style="lyra"`,
`data-theme="blue"`, `data-radius="none"`. Every value of every axis is compiled
into the stylesheet ahead of time, so choosing a design changes attributes and
never writes CSS. Colours, fonts and the radius are tokens reassigned under those
attributes; a style's own values are conditions the component reads:

```ts
borderRadius: { base: radius.md, [axes.style.lyra]: "0" },
```

That is how this site's previews change design without reloading. Your project
does not need every style: when you install, each style module is flattened to
your style, its own values only, still readable `css()`.

## Read more

The repository's [architecture notes](https://github.com/kirana-style/kirana-ui/blob/main/docs/architecture.md)
explain each choice and what it replaced in shadcn/ui.
