# @workspace/registry

The source of the component registry as it is being rebuilt: one design system with every style,
colour, font and radius compiled ahead of time and chosen by attributes on `<html>`, and
components written once per framework and base. It grows beside `packages/ui`, which keeps serving
the demo, blocks and examples until the components move here.

What is here so far, `core/`:

| File          | Holds                                                                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config.ts`   | Every axis and its values (framework, base, style, base colour, theme, chart colour, icon library, fonts, radius, menu colour and accent), the defaults, and the rules between axes (`resolveDesignSystem`) |
| `preset.ts`   | Preset codes: `k` codes for a whole design system, and shadcn/ui's `a` and `b` codes read as they are                                                                                                       |
| `palettes.ts` | The colours behind the base colour, theme and chart colour axes, as `light-dark()` pairs                                                                                                                    |
| `tokens.ts`   | The variable tokens components read: `theme`, `radiusBase`, `radius`, `font`                                                                                                                                |
| `axes.ts`     | The attributes on `<html>` and the conditions that read them: `on` (for `root.ts`) and `axes` (a relation, for components)                                                                                  |
| `root.ts`     | The `css()` handle applied to `<html>`: it reassigns the tokens for every value of the token axes                                                                                                           |

## The design system on `<html>`

Each axis is an attribute on `<html>`: `data-style`, `data-base-color`, `data-theme`,
`data-chart-color`, `data-font`, `data-font-heading`, `data-radius`, `data-menu-color`,
`data-menu-accent`, and `data-pointer`. Changing a choice changes an attribute; no stylesheet is
written at runtime, because every rule is already in Kirana's stylesheet.

- **Token axes** (colours, fonts, radius) are variable tokens reassigned under conditions on `<html>`
  itself (`root.ts`). The base colour, the theme and the chart colour each own a different group
  of tokens (20, 6 and 5), so no two axes ever set the same one.
- **Style axes** (the visual style, the menu colour, the pointer) are read by components through the
  `ui` relation anchored on `<html>`: `height: { base: space[8], [axes.style.lyra]: space[7] }`.

## Preset codes

A code is a version letter and a base-62 number holding one index per axis. `k0` is the default
design system; any shadcn/ui code (`b0`, `b6ZjlcKFk`) is read as shadcn/ui reads it, with the
framework and base taken from the URL. `readDesignSystem(new URLSearchParams(location.search))`
gives the design system a URL asks for. The value lists in `config.ts` only ever grow at their end,
so a code saved today keeps its meaning.

## Tests

`vp run test` (Vitest) checks the codec against codes written by shadcn/ui's own encoder, every
value of every axis in a round trip, the rules between axes, and the palettes' shape.

## Credit

The styles' names and descriptions, the value lists, the preset scheme and the colours are
shadcn/ui's (MIT; see `LICENSE`).
