---
title: Colours and theming
description: The base colour, the theme and the chart colours, and the tokens every component reads.
section: design
order: 2
keywords: [theme, colours, base colour, chart colours, tokens, css variables]
---

# Colours and theming

Three axes choose the colours, as on shadcn/ui's site:

- **Base colour**, the greys: Neutral, Stone, Zinc, Mauve, Olive, Mist or Taupe. It sets the background, the text, the borders and every muted surface.
- **Theme**, the accent: the base colour's own, or a hue (Amber, Blue, Cyan,
  Emerald, Fuchsia, Green, Indigo, Lime, Orange, Pink, Purple, Red, Rose, Sky,
  Teal, Violet or Yellow). It sets the primary colour and the ring.
- **Chart colours**, the five series colours, from the same list.

A theme of another base colour falls back to the base colour's own, as shadcn/ui's
customizer does.

## The tokens

Every colour is a token with shadcn/ui's name, `theme.primary` where shadcn/ui
writes `var(--primary)`, and each one is a `light-dark()` pair, so the same value
serves both modes:

```ts
import { css } from "@kirana-style/core"

import { theme } from "@/lib/kirana/tokens"

export const notice = css({
  backgroundColor: theme.muted,
  color: theme.mutedForeground,
  borderColor: theme.border,
})
```

The tokens are custom properties. The design system declares them with the
default design and reassigns them on `<html>` for the one you chose, so a
component never knows which colours are on. Translucent shades, shadcn/ui's
`bg-primary/80`, are tokens too (`alpha.primary80`), mixed with `color-mix()` from
the same variables.
