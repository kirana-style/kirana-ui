---
title: Scroll Area
description: Augments native scroll functionality for custom, cross-browser styling.
section: components
variants: [react/base, react/aria]
keywords: [scroll area, scrollbar, overflow, component, base, aria]
---

# Scroll Area

<!-- ::preview item="scroll-area-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="scroll-area" combinations="react/base,react/aria" -->

## Usage

<!-- ::start:only react/base -->

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
```

<!-- ::end:only -->

```tsx
const styles = {
  area: css({
    width: "350px",
    height: "200px",
    padding: "1rem",
    border: "1px solid",
    borderRadius: "0.375rem",
  }),
}

;<ScrollArea sx={styles.area}>Your scrollable content here.</ScrollArea>
```

## Composition

<!-- ::start:only react/base -->

Use the following composition to build a `ScrollArea`:

```text
ScrollArea
└── ScrollBar
```

<!-- ::end:only -->

## Horizontal

<!-- ::start:only react/base -->

Use `ScrollBar` with `orientation="horizontal"` for horizontal scrolling.

<!-- ::end:only -->

<!-- ::preview item="scroll-area-horizontal-demo" height="360" combinations="react/base,react/aria" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area#api-reference) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
