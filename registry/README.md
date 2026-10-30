# @workspace/registry

The source of the component registry as it is being rebuilt: one design system with every style,
colour, font and radius compiled ahead of time and chosen by attributes on `<html>`, and
components written once per framework and base. It grows beside `packages/ui`, which keeps serving
the demo, blocks and examples until the components move here.

What is here so far, `core/`, the design system:

| File          | Holds                                                                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config.ts`   | Every axis and its values (framework, base, style, base colour, theme, chart colour, icon library, fonts, radius, menu colour and accent), the defaults, and the rules between axes (`resolveDesignSystem`) |
| `preset.ts`   | Preset codes: `k` codes for a whole design system, and shadcn/ui's `a` and `b` codes read as they are                                                                                                       |
| `palettes.ts` | The colours behind the base colour, theme and chart colour axes, as `light-dark()` pairs                                                                                                                    |
| `tokens.ts`   | The variable tokens components read: `theme`, `radiusBase`, `radius`, `font`                                                                                                                                |
| `axes.ts`     | The attributes on `<html>` and the conditions that read them: `on` (for `root.ts`) and `axes` (a relation, for components)                                                                                  |
| `root.ts`     | The `css()` handle applied to `<html>`: it reassigns the tokens for every value of the token axes                                                                                                           |
| `context.ts`  | Values a parent hands its children: `ctx.iconSize` (a control's icons, `styles/control.ts`), and `menuCtx`, the colours a menu surface gives its rows                                                       |
| `states.ts`   | Component states with each base's key (Base UI, React Aria, Ark UI), and `when(state, value)`, which writes them all                                                                                        |
| `scales.ts`   | The Tailwind vocabulary styles are written in: spacing, type, shadows, durations, layers                                                                                                                    |
| `kirana.ts`   | `registryConfig`, which every app compiling the registry spreads into its `kirana.config.ts`                                                                                                                |

And beside it:

- `styles/`, each component's look in every style (`button`, `dialog`, `select`, `checkbox`,
  `table` … one module per component, `docs/catalogue.md` lists them), over the shared `menu`,
  `overlay`, `control` and `check` modules, with the page's own styles, the frame of upstream's examples, `reset.css`, and
  `typeset.css` with its `typeset` handle (shadcn/ui's typeset, plain CSS in the `typeset` layer,
  reading `--typeset-*` variables the handle sets from the tokens);
- `bases/`, the components once per framework and base: `react-base` (Base UI) and `react-aria`
  with the `login-01` block; `vue-ark` (Ark UI on Vue) for Button, Card, Dialog, Select,
  DropdownMenu, Skeleton and Tabs; `svelte-ark`, `solid-ark` (Ark UI on Svelte and Solid) and
  `angular-ng` (ng-primitives on Angular) for Button, Card and Skeleton;
- `icons/`, `IconPlaceholder` for React and Vue over one map of icon data (the other frameworks
  get theirs with their first icon). Installed with
  shadcn/ui's CLI, a React placeholder becomes the project's own icon component, and the import of
  `icon-placeholder.tsx` is dropped;
- `lib/`, the `Sx` type for React (a Vue part takes its caller's `:sx` with Kirana's `useSx()`).

`docs/catalogue.md` lists their exports and how to write each.

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

## Styles

A style module is a component's parts as `css()` handles, written once for every style and every
base: Nova, the default style, is each property's base value, and the other styles override it
under `axes.style.*`. A state is written with `when()`, which gives every base's key for it. The
component, written per framework and base, composes the parts with `sx`.

`vp run styles` compiles every module with this package's `kirana.config.ts` and fails on any
diagnostic, warnings included; no app compiles them yet.

## Markup

A component's copy for a framework and base applies the style modules and holds no style values:
`sx` on an element, `props()` spread on a library's part, and in Vue Kirana's `useSx()`, whose
caller's classes go last in the root's own `:sx`. Its part and prop names follow upstream's copy for
that base. Svelte takes its caller's `sx` as the `class` prop, Solid as a prop, and Angular's
parts are directives that merge their `sx` input onto the host's `class`. Each framework's preview
app (`apps/preview-react`, `-vue`, `-svelte`, `-solid`, `-angular`) renders its copies, and its build is
where they compile and where their templates are checked.

## Previews

`core/preview.ts` is how a preview page takes its design: the URL's `?preset=` and upstream's axis
parameters, then the framing page's `design-system-params` messages, as attributes on `<html>`.
Each base's `previews.ts` maps item names to components; the React preview's
`/preview/react/<base>/<item>` and the Vue preview's `/preview/vue/ark/<item>` render them. `docs/catalogue.md` has the protocol.

Besides the slice's own demos (`*-demo`), the React bases carry upstream's `button-example`,
`dialog-example`, `select-example` and `dropdown-menu-example` in its frame (`components/example.tsx`, `styles/example.styles.ts`), layout and
all, so the conformance harness can pair them with upstream's pages element for element
(`docs/workflows.md`, "Against shadcn/ui's own site").

## The registry build

`vp run registry` (`packages/builder`) flattens every style module to each combination of
framework, base and style, checks with Kirana that the flattened module renders what the live one
does, and writes the items into the site's static files (`/r`): in Kirana's format, one item for
every framework and base with its style modules as written (`/r/<item>.json`, `/r/index.json`), and
for shadcn/ui's CLI, flattened per combination (`/r/shadcn/<combination>/<item>.json`). A style module must
stay readable by it: Kirana's functions called at the top level, state keys through `core/states.ts`
(`when()`, its groups), a relation declared in one module and imported elsewhere.

## Tests

`vp run test` (Vitest) checks the preview protocol, the codec against codes written by shadcn/ui's own encoder, every
value of every axis in a round trip, the rules between axes, and the palettes' shape.

## Credit

The styles' names and descriptions, the value lists, the preset scheme and the colours are
shadcn/ui's (MIT; see `LICENSE`).
