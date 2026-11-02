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

## In your project

A project has its own design's colours only. Each colour axis is two files in
`lib/kirana/`, its palette (`base-color-palette.ts`, `theme-palette.ts`,
`chart-color-palette.ts`) and the rules that put it on `<html>` (`base-colors.ts`,
`themes.ts`, `chart-colors.ts`), and each holds the one value its preset chose; the
default, Neutral, is the tokens' own values (`lib/kirana/neutral.ts`).
`kirana-style ui preset` replaces them with the new design's. On a
project with fourteen components, the stylesheet is 2.7 KB gzip with the default
design and 3.6 KB with Stone, Cyan and Green, against 9.5 KB when every colour was
installed.

To let your readers switch between kirana/ui's designs, a picker of your own that
sets the attributes on `<html>` (`data-base-color`, `data-theme`,
`data-chart-color`, `data-style` …), keep every design installed:

<!-- ::install run="@kirana-style/registry init --preset k0 --all-designs" -->

It records `ui.allDesigns` in `kirana.config.ts`: every style's modules and every
colour stay as written, and the stylesheet carries them all.

For colours of your own rather than kirana/ui's, override the tokens with
Kirana's `defineTheme` and apply it where they hold:

```ts
import { defineTheme } from "@kirana-style/core"

import { theme } from "@/lib/kirana/tokens"

export const brand = defineTheme(theme, {
  primary: { light: "oklch(0.55 0.2 260)", dark: "oklch(0.72 0.15 260)" },
  primaryForeground: "oklch(0.985 0 0)",
})
```
