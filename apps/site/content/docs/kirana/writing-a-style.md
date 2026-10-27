---
title: Writing a style
description: Change an installed component's look in its style module, or write one style's values beside the others.
section: kirana
order: 3
keywords: [style module, customize, override, css, variants, recipe]
---

# Writing a style

An installed component is yours: its look is in its style module, beside its
markup, and you change it there.

## Change a component

The module installed for your style holds only that style's values:

```ts
// components/ui/separator.styles.ts, installed on Base UI
export const separator = css({
  // … display, border and margin resets
  flexShrink: 0,
  backgroundColor: theme.border,
  height: { '[data-orientation="horizontal"]': "1px" },
  width: {
    '[data-orientation="horizontal"]': "100%",
    '[data-orientation="vertical"]': "1px",
  },
})
```

Edit a value, add a property, or add a state:

```ts
export const separator = css({
  // …
  flexShrink: 0,
  backgroundColor: theme.input,
  height: { '[data-orientation="horizontal"]': "2px" },
  width: {
    '[data-orientation="horizontal"]': "100%",
    '[data-orientation="vertical"]': "2px",
  },
  marginBlock: space[2],
})
```

`kirana-style ui update` keeps what you changed, and `kirana-style ui diff` shows
it beside the registry's version.

## Change one use

A caller's `sx` is merged after the component's own, property by property:

```tsx
const wide = css({ width: "100%" })

<Button sx={wide}>Continue</Button>
```

A component's state values survive a plain override. To change a state, write it
under the same condition: `{ base: …, ":hover": … }`.

## A module for every style

The registry's modules hold all eight styles at once: Nova's value as the base of
each property, and another style's under its condition, only where it differs.

```ts
// card.styles.ts in the registry: the card's spacing, in every style
const { vega, maia, luma, rhea, sera } = axes.style

[cardCtx.spacing]: {
  base: space[4],
  [vega]: space[6],
  [maia]: space[6],
  [luma]: space[6],
  [rhea]: space[5],
  [sera]: space[8],
},
```

Mira and Lyra keep Nova's.

Where Nova's value has a state and another style's differs, the other style
restates it under its own condition, since a state outranks the style's read. When
you install, the module is flattened to your style and these conditions are gone.
