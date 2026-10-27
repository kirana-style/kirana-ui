# Catalogue

What already exists. Check here before writing a new token, recipe or primitive —
the point of this file is that you do not rebuild something that is already here
under a different name.

This repository carries all of `packages/ui` (61 components), `packages/shell`
and the three apps — the demo, blocks and examples — ported from a StyleX port of
the same apps (kept in kirana-lab as `baselines/stylex`).

## Where things live

```mermaid
flowchart TD
    Q{"What are you adding?"}
    Q -->|"a raw scale value<br/>colour, spacing, size"| T["tokens/*.ts<br/><b>a plain constant</b>, or a re-export of @kirana-style/preset-scales"]
    Q -->|"a value the mode changes"| S["theme/semantic.ts<br/><b>light-dark()</b> in a variable group"]
    Q -->|"a value a parent hands a child"| C["theme/context.ts<br/><b>defineTokens(…, { variable: true })</b>"]
    Q -->|"a new group/peer relationship"| M["theme/markers.ts<br/><b>relation()</b>"]
    Q -->|"variants for one component"| R1["recipes/&lt;component&gt;.ts"]
    Q -->|"chrome shared by several"| R2["recipes/control · overlay · menu"]
    Q -->|"a layout or text building block"| P["primitives/"]
    Q -->|"a component"| K["components/&lt;name&gt;.tsx"]
    Q -->|"a rule for markup we do not own"| G["styles/globals.css<br/><i>last resort</i>"]
```

`packages/ui/kirana.config.ts` exports `uiConfig` (from `src/kirana.ts`) for tools
run inside the package — the lint plugin, `kirana check`, the language server.
Apps spread the same object into their own configuration.

## Layer 1 — tokens (constants, emit no CSS)

| File             | Exports                                                                     | Notes                                                                                                                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `colors.ts`      | `color`                                                                     | The full Tailwind 4.3 palette, 26 hues × 11 steps, in oklch. `color.red500`                                                                                                                                                  |
| `spacing.ts`     | `spacing`                                                                   | Re-exports `space` from `@kirana-style/preset-scales`. `spacing[4]`, `spacing["2.5"]`                                                                                                                                        |
| `typography.ts`  | `fontFamily` `fontSize` `lineHeight` `fontWeight` `letterSpacing` `leading` | `fontSize.sm` pairs with `lineHeight.sm` — always set both. Ratios are stored rounded up; see the file                                                                                                                       |
| `shadows.ts`     | `shadow`                                                                    | Re-exports `@kirana-style/preset-scales`. `shadow.sm` … `shadow.2xl`                                                                                                                                                         |
| `blur.ts`        | `blur`                                                                      | Re-exports `@kirana-style/preset-scales`. Lengths for `blur(${blur.xs})`. `backdrop-blur-xs` is 4px, not 2px                                                                                                                 |
| `breakpoints.ts` | `breakpoint` `screen` `pointer`                                             | `breakpoint.md` is a condition key; `screen.md` is the raw width. `3xl` (100rem) is shadcn's addition, not Tailwind's. `pointer.coarse` is a touch screen                                                                    |
| `container.ts`   | `container` `containerName` `fieldGroupQuery` `cardHeaderQuery`             | Named container queries                                                                                                                                                                                                      |
| `motion.ts`      | `duration` `easing` `motion`                                                | `easing.inOut` for transitions. `easing.cssOut` for ported `animate-*` keyframes. `easing.cssEase` for overlay enter/exit. `duration[2000]` and `easing.pulse` exist for `animate-pulse`, which is 2 s on a curve of its own |
| `z-index.ts`     | `zIndex`                                                                    | Named layers: `base` … `toast`. `overlay` and `popover` are both 50, as shadcn's `z-50`                                                                                                                                      |
| `ring.ts`        | `ring`                                                                      | `ring.width`                                                                                                                                                                                                                 |
| `scroll-fade.ts` | `scrollFadeVars`                                                            | A registered custom property (`syntax: "<length-percentage>"`), so the fade can animate; read by `scrollFadeStyles`                                                                                                          |

`@kirana-style/preset-scales` also has `duration`, `easing` and `zIndex` in Tailwind's
own steps; this package keeps its own named versions above.

## Layer 2 — semantic (variable tokens)

All in `theme/semantic.ts`, each group `defineTokens(…, { variable: true })`.
Every colour is one `light-dark(<light>, <dark>)` value; the `color-scheme` on
`<html>` decides which half applies.

| Group     | For                                                 | Example                                         |
| --------- | --------------------------------------------------- | ----------------------------------------------- |
| `theme`   | The shadcn palette                                  | `theme.primary`, `theme.mutedForeground`        |
| `alpha`   | Translucent derivatives of `theme`                  | `alpha.ring50`, `alpha.destructive20`           |
| `surface` | Component intent that differs structurally per mode | `surface.control`, `surface.inactiveForeground` |
| `radius`  | The derived roundness scale                         | `radius.lg`                                     |

Three `surface` tokens are not colours (`imageRingBlend`, `imageBrightness`,
`imageDim`) and are written as mode objects, `{ light, dark }`. `theme/themes.ts`
holds only `THEME_MODES`; ThemeProvider's `themeStyles(mode)` is Kirana's
`mode[mode]` handle, which the root route puts on `<html>`.

> **Adding a colour token** is one line: `name: "light-dark(<light>, <dark>)"`.
> A token derived from another (`color-mix` over `theme.x`, or
> `light-dark(${theme.muted}, ${theme.background})`) needs nothing more. A new
> **non-colour** per-mode token is a `{ light, dark }` object in `surface`.

## Layer 3 — conditions

**`theme/markers.ts`** — 31 relations, one per relationship that is actually read,
plus the unnamed `peer`. The `…Marker` names are kept from the StyleX port.

**`theme/button-group-marker.ts`** — `buttonGroupMarker`, on its own. A relation
read by a component an app can render **without** the anchoring one (every `Button`
reads the group; only `ButtonGroup` anchors it) gets a module of its own, imported
only by the reader and the anchor. A build checks a relation only when it compiled
the declaring module (D-062), and the import leaves with the styles that use it —
so an app that never renders the anchor never compiles the declaration. In the
shared `markers.ts`, which every app compiles, the docs app failed its build as soon
as it stopped rendering a `ButtonGroup`. `kirana check` still checks the relation
project-wide.

**`theme/scheme-marker.ts`** — `schemeMarker`, the colour mode on `<html>`: every app's
root applies its anchor with `data-mode="light" | "dark" | "system"`, and the theme
controls read it to show the mode's icon (`schemeMarker.within('[data-mode="dark"]')`).
It is for what `light-dark()` cannot switch, such as an image per scheme. On its own
for the same reason as `buttonGroupMarker`.

A relation earns its place only when some element applies its `anchor` **and**
some style reads it. The anchor goes on the element whose state is read: the
ancestor for `within`, the earlier sibling for `after`, the later sibling for
`before`. `has-*` needs no relation: use a `":has(…)"` key. The compiler reports
a read with no anchor anywhere (error) and an anchor never read (warning).

**`theme/context.ts`** — values a parent hands to a child:

| Token                 | Set by                                                       | Read by                                                                  |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `ctx.iconSize`        | every control                                                | the `Icon` primitive                                                     |
| `ctx.cardSpacing`     | `Card`, picked by `size`                                     | its header, content, footer                                              |
| `ctx.gap`             | a layout that spaces its groups                              | the columns and nested grids inside it                                   |
| `ctx.controlPadding*` | `InputGroup`                                                 | the control inside it                                                    |
| `ctx.skeletonWidth`   | `SidebarMenuSkeleton`                                        | `Skeleton`                                                               |
| `menuCtx.*`           | a menu popup, via `menuStyles.content` or `menuStyles.glass` | its rows and separators: highlight, destructive colour, separator colour |
| `toastCtx.*`          | `Toast`                                                      | the stack transform                                                      |
| `drawerCtx.*`         | `Drawer`                                                     | the gesture transform                                                    |
| `sidebarCtx.*`        | `SidebarProvider`                                            | the sidebar's parts                                                      |
| `calendarCtx.*`       | `Calendar`                                                   | its grid                                                                 |

Assign one with the token as a key: `css({ [ctx.iconSize]: "0.875rem" })`, with
conditions like any property. Every default in `context.ts` is inert. The
component that sets a variable assigns its real value on its own element, because
a default is evaluated on `:root`: there it cannot see a library's element-level
variables.

**`theme/animations.ts`** — `animation.spin` `pulse` `caretBlink` `shimmer`, from
`keyframes()`. Use them as `animationName` from any module.

## Layer 4 — recipes

| Export                                      | From                      | Use for                                                                                           |
| ------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------- |
| `recipe()`                                  | `recipes/recipe.ts`       | Any variant set. The `cva` replacement (a lookup over compiled styles; see below)                 |
| `button`, `buttonRing`, `buttonLabel`       | `recipes/button.ts`       | Buttons, and anything that should look like one. `buttonLabel` trims element labels to cap height |
| `badge`, `badgeRing`                        | `recipes/badge.ts`        | Badges                                                                                            |
| `toggle`                                    | `recipes/toggle.ts`       | Toggle and ToggleGroupItem                                                                        |
| `buttonGroup`, `groupedItem`, `groupedFill` | `recipes/button-group.ts` | A control that can sit in a ButtonGroup                                                           |
| `controlStyles`                             | `recipes/control.ts`      | Anything that reads as a form field                                                               |
| `overlayStyles`                             | `recipes/overlay.ts`      | Enter/exit motion: `popup` `modal` `panel` `backdrop`                                             |
| `menuStyles`, `menuItem`                    | `recipes/menu.ts`         | Any menu-shaped popup. `content` is solid; add `glass` after it for the translucent surface       |
| `scrollFadeStyles`                          | `recipes/scroll-fade.ts`  | Fading a scroll container's trailing edge while there is more to scroll                           |
| `touchTarget`                               | `recipes/touch.ts`        | The site's own small controls: 44 × 44 px on a touch screen. Never on a ported shadcn component   |

The package's `recipe()` helper predates Kirana's own `recipe()` from
`@kirana-style/core`, which adds compound variants, slots and build-time resolution.
New recipes may use either; moving the existing ones is part of the follow-up
port.

Menus come in two surfaces, matching the originals. ContextMenu and Menubar are
solid: `accent` highlight, red destructive rows, `border` separators.
DropdownMenu, Select and Combobox are glass: `foreground/10` highlight, destructive rows in the normal text colour,
`foreground/5` separators. The rows never know which they are in; they read
`menuCtx`.

Using a recipe:

```tsx
<ButtonPrimitive
  {...styleProps(buttonRing, ...button({ variant, size }), groupedItem, sx)}
/>
```

Order matters: ring, then the recipe, then anything contextual, then `sx` last so
callers can override. On a plain element the same list goes in
`sx={[buttonRing, ...button({ variant, size }), sx]}`.

## The colour mode (`packages/shell`)

The same system as the Kirana site's. Every app's root route wires it the same way:

| Piece                                        | File                    | Does                                                                                                                         |
| -------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `THEME_COOKIE`, `readThemeMode()`            | `theme-mode.ts`         | The `kirana-theme` cookie, read in the root's `beforeLoad` on the server and in the browser                                  |
| `ThemeProvider` with `cookie={THEME_COOKIE}` | `@workspace/ui/theme/…` | Writes the cookie on a change and tells the site's other tabs (a `BroadcastChannel`)                                         |
| `themeDocumentProps(mode)`, `THEME_SCRIPT`   | `theme-document.ts`     | `<html>`'s classes and the scheme anchor; an inline script that applies the saved mode (or a frame's `?theme=`) before paint |
| `ThemeMenu`                                  | `theme-menu.tsx`        | The app shell's header control: sun or moon, opening Light, Dark and System                                                  |
| `ThemeToggle`, `useThemeHotkey`              | `theme-toggle.tsx`      | A pill stepping System, Light, Dark with the `D` key; the hotkey alone. One hotkey per page                                  |
| `headMeta`, `headLinks`, `siteTitle()`       | `head.ts`               | The Kirana mark as the icons, the manifest, `theme-color` per scheme, "Blocks · Kirana UI" titles                            |

`<html>` renders `data-mode={mode}`, `{...themeDocumentProps(mode)}` and
`suppressHydrationWarning`, with `THEME_SCRIPT` first in `<head>`: a prerendered page
hydrates in the system mode while the script has already set the saved one. A theme
control shows its mode from `data-mode` in CSS, never from React state, for the same
reason.

## The design system (`registry/core`, being built)

The customizable design system the components move to. Nothing renders from it
yet; see `registry/README.md`.

| Export                                                                                                             | File            | For                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme` `radiusBase` `radius` `font`                                                                               | `tokens.ts`     | The variable tokens components read. Same names as `theme/semantic.ts`; `radius.*` derive from `radiusBase.value`                                                                                                                              |
| `root`                                                                                                             | `root.ts`       | Applied to `<html>`: reassigns the tokens for each base colour, theme, chart colour, font and radius                                                                                                                                           |
| `axes` (`style.*`, `menuColor.*`, `pointer`, `mode.*`), `DARK_SCHEME`, `on`                                        | `axes.ts`       | `axes.*` read `<html>` through the `ui` relation, inside a property; `on.*` are conditions on `<html>` for `root.ts`; `axes.mode` with `DARK_SCHEME` for a value that is not a colour (a blend mode)                                           |
| `AXIS_ATTRIBUTES`, `POINTER_ATTRIBUTE`                                                                             | `attributes.ts` | The attribute each axis is written to (`data-base-color` …), with no Kirana call, so a test or a script can read it                                                                                                                            |
| `AXES`, `DEFAULT_DESIGN_SYSTEM`, `resolveDesignSystem`                                                             | `config.ts`     | Every axis's values (append-only), the defaults, the rules between axes                                                                                                                                                                        |
| `encodePreset`, `decodePreset`, `readDesignSystem`                                                                 | `preset.ts`     | `k` codes, shadcn/ui's `a` and `b` codes, the design system a URL asks for                                                                                                                                                                     |
| `baseColors`, `themeColors`, `chartColors`                                                                         | `palettes.ts`   | The colours, as `light-dark()` pairs; each axis owns a disjoint group of tokens                                                                                                                                                                |
| `alpha`, `surface`                                                                                                 | `tokens.ts`     | Translucent colours (`alpha.foreground10`) and what shadcn/ui wrote with `dark:` (`surface.control`)                                                                                                                                           |
| `ctx`, `menuCtx`, `cardCtx`, `sidebarCtx`                                                                          | `context.ts`    | Values a parent hands its children: the icon size, a menu surface's row colours, a card's rhythm, a sidebar's widths                                                                                                                           |
| `when`, `overlay`, `presence`, `side`, `item`, `tab`, `tabOrientation`, `disclosure`, `placeholder`, `orientation` | `states.ts`     | Component states with each base's key; `...when(item.highlighted, x)` writes every base's                                                                                                                                                      |
| `space`, `fontSize`, `lineHeight`, `duration` …                                                                    | `scales.ts`     | The Tailwind vocabulary styles are written in (constants); `lineHeight` is rounded up so text keeps whole pixels                                                                                                                               |
| `registryConfig`                                                                                                   | `kirana.ts`     | What every app compiling the registry spreads into its `kirana.config.ts`: the states that never hold together; it imports no module of its own, since Node loads it (`orientation` is declared there for that, and `states.ts` re-exports it) |
| `readPreviewDesign`, `readPageDesign`, `documentAttributes`, `listenForDesign` …                                   | `preview.ts`    | The preview pages' protocol: the design a URL or a framing page's message names, as attributes on `<html>`                                                                                                                                     |

Adding a value to an axis: append it to its list in `config.ts` (never insert or
reorder: saved codes would change meaning), add its colours or family, an `on`
condition in `axes.ts`, and its entries in `root.ts`.

## The registry's styles (`registry/styles`, being built)

Each component's look in every style, as `css()` handles its parts compose. Nova
is the base value; Vega, Lyra, Maia, Mira, Luma, Rhea and Sera override per
property. The markup in
`registry/bases` applies them; the Vue preview renders the `vue-ark` copy.

| Module                      | Exports                                                                                                                                                                                                                                                                                                                                       | For                                                                                                                                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button.styles.ts`          | `button` (a recipe: `variant`, `size`), `buttonLabel`                                                                                                                                                                                                                                                                                         | Button, and the controls drawn as one (the dialog's close)                                                                                                                                                                                                                       |
| `dialog.styles.ts`          | `dialog.overlay` `.content` `.inner` `.close` `.header` `.footer` `.title` `.description`                                                                                                                                                                                                                                                     | Dialog (`.inner` is React Aria's `Dialog` inside its modal)                                                                                                                                                                                                                      |
| `select.styles.ts`          | `select.trigger` `.triggerIcon` `.value` `.content` `.popover` `.list` `.group` `.item` `.itemText` `.indicator` `.root` `.separator` …                                                                                                                                                                                                       | Select, over the menu parts (its separator alone ignores the pointer)                                                                                                                                                                                                            |
| `dropdown-menu.styles.ts`   | `dropdownMenu.content` `.subContent` `.subTrigger` `.subTriggerIcon`                                                                                                                                                                                                                                                                          | DropdownMenu, over the menu parts                                                                                                                                                                                                                                                |
| `menu.styles.ts`            | `menuSurface`, `menuPositioner`, `menuList`, `menuRowBase`, `menuRowPadding`, `menuCheckableRowPadding`, `menuLabel` …                                                                                                                                                                                                                        | What every menu-shaped popup shares; the menu colour axis (inverted, translucent) here                                                                                                                                                                                           |
| `overlay.styles.ts`         | `popupMotion`, `modalMotion`, `backdropMotion`, `ANCHOR_WIDTH`, `TRANSFORM_ORIGIN`                                                                                                                                                                                                                                                            | How popups, modals and backdrops come and go, on every base; the positioner's sizes                                                                                                                                                                                              |
| `card.styles.ts`            | `card.root` `.header` `.title` `.description` `.action` `.content` `.footer`, `cardScope`                                                                                                                                                                                                                                                     | Card; its rhythm is `cardCtx.spacing`                                                                                                                                                                                                                                            |
| `tabs.styles.ts`            | `tabs.root` `.list` `.listDefault` `.listLine` `.trigger` `.content`, `tabsScope`, `tabsList`                                                                                                                                                                                                                                                 | Tabs: the root's orientation and the list's variant read by the triggers; a line list's bar in `::after`                                                                                                                                                                         |
| `chart.styles.ts`           | `chart.container` `.plot` `.tooltip` … `.indicator` `.legend` …                                                                                                                                                                                                                                                                               | Chart on TanStack Charts: the container, the tooltip body and the legend; the drawing's colours are `chartTheme` (`ui/chart.tsx`)                                                                                                                                                |
| `field.styles.ts`           | `field.set` `.legend` `.group` `.root` `.content` `.label` `.title` `.description` `.separator` `.error` …, `fieldLegend`, `fieldGroup`                                                                                                                                                                                                       | Field and its parts                                                                                                                                                                                                                                                              |
| `input.styles.ts`           | `input`                                                                                                                                                                                                                                                                                                                                       | Input                                                                                                                                                                                                                                                                            |
| `label.styles.ts`           | `label`                                                                                                                                                                                                                                                                                                                                       | Label, and FieldLabel under the field's own                                                                                                                                                                                                                                      |
| `separator.styles.ts`       | `separator`                                                                                                                                                                                                                                                                                                                                   | Separator, on Base UI's `data-orientation` and React Aria's `aria-orientation`                                                                                                                                                                                                   |
| `sidebar.styles.ts`         | `sidebar.wrapper` `.root` `.gap` `.container` `.inner` `.rail` `.inset` `.header` `.content` `.group` … `.menuButton` (with `.menuButtonDefault` `.menuButtonSm` `.menuButtonLg` `.menuButtonOutline`) `.menuAction` `.menuSub` …, `sidebarScope`, `sidebarWrapper`, `sidebarMenuItem`, `sidebarMenuButton`, `COLLAPSED`, `WRAPPER_COLLAPSED` | Sidebar: its parts read the sidebar's collapsed state, side and variant; the inset reads it as a sibling; Maia, Luma, Rhea and Sera re-base every radius token inside the header and content                                                                                     |
| `sheet.styles.ts`           | `sheet.overlay` `.content` `.side.top` `.side.right` `.side.bottom` `.side.left` `.inner` `.close` `.header` `.footer` `.title` `.description`                                                                                                                                                                                                | Sheet: one handle per side, chosen from its `side` prop                                                                                                                                                                                                                          |
| `tooltip.styles.ts`         | `tooltip.positioner` `.content` `.arrow`                                                                                                                                                                                                                                                                                                      | Tooltip, over `popupMotion`; React Aria places its arrow from the placement                                                                                                                                                                                                      |
| `avatar.styles.ts`          | `avatar.root` `.image` `.fallback` `.fallbackAfterImage` `.badge` `.group` `.groupCount`, `avatarScope`, `avatarGroup`, `avatarImage`                                                                                                                                                                                                         | Avatar; React Aria's fallback shows only after an image that failed                                                                                                                                                                                                              |
| `breadcrumb.styles.ts`      | `breadcrumb.list` `.item` `.link` `.page` `.separator` `.ellipsis`                                                                                                                                                                                                                                                                            | Breadcrumb                                                                                                                                                                                                                                                                       |
| `skeleton.styles.ts`        | `skeleton`                                                                                                                                                                                                                                                                                                                                    | Skeleton                                                                                                                                                                                                                                                                         |
| `collapsible.styles.ts`     | `collapsibleScope`, `OPEN`                                                                                                                                                                                                                                                                                                                    | Collapsible draws nothing; what a page puts in one reads it open (`group/collapsible`)                                                                                                                                                                                           |
| `control.ts`                | `focusRing`, `laterRings`, `controlShadow`, `controlTransition`, `controlIcons`, `GROUP_MD`                                                                                                                                                                                                                                                   | What controls share: rings, Vega's `shadow-xs` under them, how colours move, icon size; `fillInField` is the width a part with its own `w-fit` takes to fill a vertical field (label, title, select trigger), here so a control needs no Field markup where a framework has none |
| `field-scope.styles.ts`     | `fieldScope`, `fillInField`, `CHILD_OF_VERTICAL`, `CHILD_OF_RESPONSIVE`                                                                                                                                                                                                                                                                       | Field's relation, optional, and the width a part with its own `w-fit` takes as a field's child: a select trigger reads it without depending on Field                                                                                                                             |
| `visually-hidden.styles.ts` | `visuallyHidden`                                                                                                                                                                                                                                                                                                                              | Text only a screen reader reaches (`sr-only`)                                                                                                                                                                                                                                    |
| `page.styles.ts`            | `page.document`, `page.body`, `page.example`, `page.demo`                                                                                                                                                                                                                                                                                     | The colour scheme on `<html>`; the page's background, text colour and font; a demo's frame, and the centring around it on a preview page                                                                                                                                         |
| `example.styles.ts`         | `example.page` `.wrapper` `.oneColumn` `.root` `.title` `.content` `.centred` `.row`                                                                                                                                                                                                                                                          | The frame upstream's examples sit in on a preview page; the site's, not installable                                                                                                                                                                                              |
| `reset.css`                 | the `reset` layer                                                                                                                                                                                                                                                                                                                             | Tailwind's preflight as far as the components rely on it; no pointer cursor                                                                                                                                                                                                      |

A chart is a TanStack Charts definition handed to `ChartContainer` with a
`ChartConfig`. The config names each series' colour by its token,
`color: theme.chart1`, where shadcn/ui's charts write `var(--chart-1)`: the
registry's tokens are custom properties Kirana names, so `--chart-1` does not
exist. A mark reads the series as upstream's does, `var(--color-desktop)`, which
the container sets. `chartTheme` gives a definition the axis, grid and palette
colours and no focus ring, as upstream's charts draw none.

Writing one:

- name the upstream rule each part comes from in a `//` comment above it
  (`// cn-select-trigger`; several hooks in one comment are fine, each written
  out in full) and the commit it was read at, and say in the header what differs
  on purpose. The upstream scan reads these comments as each hook's place, and
  `vp run upstream -- accept` refuses an item with a hook no comment names;
- write Nova as `base` and each other style as `[axes.style.<name>]` inside the
  property. A state or breakpoint entry whose value differs in a style is
  restated under that style (`[SMALL]: { base: …, [vega]: … }`). In a recipe, a
  style's entry in the base outranks a variant's plain value, so a variant
  restates the value for every style whose base entry it must beat (Button's
  `xs` sets `[sera]: "0.75rem"` for its icons, over the base's Sera `0.875rem`);
- a property only some styles set goes under each of those styles, Nova
  included, with no `base`: `backgroundColor: { [nova]: alpha.muted50 }`, not
  `{ base: alpha.muted50, [vega]: "transparent", … }`. A style that sets nothing
  then gets what the reset or inheritance gives, as upstream's does, and its
  installed code carries no dead declaration (Dialog's footer). Keep
  unconditional what a style without the property still reads: Card's footer
  rule has a width only in Nova and Lyra, but its colour in every style, since
  the reset gives an element no border colour. Compare the site before and after
  in the browser; a reset that changes no pixel can still change a computed
  value;
- upstream draws its style rules in a layer below its components' own classes:
  where both set a property, write the component's value;
- write a state with `...when(state, value)`; a value that needs two states is a
  block per base (`overlay.styles.ts`): one `when()` inside another pairs every
  base's key with every other's. Kirana leaves the pairs that never match out of
  the stylesheet, but reports each as an `unreachable-entry` info, ten for the
  popup's slide alone. Two bases' keys for one state are
  exclusive through `exclusiveAcross` in `kirana.ts`; a key written by hand,
  which no vocabulary names (React Aria's `aria-orientation`), needs a pair in
  `exclusive`;
- a part that styles itself by its parent, where upstream's parent reached in
  with `*:`, reads the parent's relation with `parent()`:
  `fieldScope.parent('[data-orientation="vertical"]')`, or `fieldGroup.parent()`
  for a group directly inside another. It ranks as a pseudo-class, so it beats a
  style's override as upstream's `*:` did; a relation's `within` means any
  ancestor, not the parent. A part of another component reads the same relation
  through `fillInField` (`field-scope.styles.ts`): `fieldScope` is declared
  `relation("field", { optional: true })` there, in a module every framework
  installs, so a select installed without Field (the Vue slice) reads it and
  never matches, where a read of a missing anchor would be an error;
- a control with icons spreads `...controlIcons`: every `svg` inside it is
  `ctx.iconSize`, never shrunk, never the target of a click, and a size variant
  only changes `ctx.iconSize`. An icon's own style is spread on the placeholder as
  `{...props(…)}`, never `sx`: once installed, the placeholder is the project's
  icon component;
- `vp run styles` compiles the registry with its own config and fails on any
  warning.

## The registry's markup (`registry/bases`, being built)

The components, once per framework and base, applying the style modules and
holding no style values of their own. Part names, `data-slot` names and props
follow upstream's copy for that base.

| Folder                          | Holds                                                                                                                                                                                                                                                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-base/ui`                 | Button, Dialog, Select, DropdownMenu, Tabs, Chart, Card, Field, Input, Label, Separator, Sidebar, Sheet, Tooltip, Avatar, Breadcrumb, Skeleton, Collapsible on Base UI; `sx` on each part                                                                                                                                   |
| `react-base/blocks`, `examples` | `login-01`, `sidebar-07`; a demo per component (`button-demo` …, fifteen, upstream's where the registry has what they use) in the shared `page.example` frame; upstream's `button-example`, `dialog-example`, `select-example`, `dropdown-menu-example`, `tabs-example` and `chart-example` (its Bar Chart), layout and all |
| `*/components`                  | `example.tsx`: `ExampleWrapper` and `Example`, the frame upstream's examples sit in (`containerSx` for its outer part)                                                                                                                                                                                                      |
| `*/previews.ts`                 | Each base's items by registry name, each loaded on its own, for its preview pages                                                                                                                                                                                                                                           |
| `react-aria/ui`, `blocks`       | The same on React Aria. Its Dialog is the modal (inside `DialogTrigger`), its DropdownMenu the menu in its popover                                                                                                                                                                                                          |
| `vue-ark/ui`                    | Button, Dialog, Select, DropdownMenu, Tabs on Ark UI, one single-file component per part, `index.ts` per component                                                                                                                                                                                                          |

And what they share:

| File                                        | For                                                                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `icons/data.ts`                             | The icons components name through `IconPlaceholder`, as Lucide's and Hugeicons' framework-neutral data   |
| `icons/icon-placeholder.tsx`                | `IconPlaceholder` and `IconLibraryProvider` for React; named for shadcn/ui's CLI, which drops its import |
| `icons/IconPlaceholder.vue`, `icons/vue.ts` | `IconPlaceholder` for Vue, and `ICON_LIBRARY`, the key a page provides its library under                 |
| `lib/sx.ts`                                 | The `Sx` type and `WithSx<P>`                                                                            |
| `lib/use-mobile.ts`                         | `useIsMobile()`: whether the screen is narrower than `md`, for the sidebar's sheet                       |

Writing a Vue part:

- `defineOptions({ inheritAttrs: false })`, `const { sx, attrs } = useSx()`
  (`@kirana-style/core/vue`), and on the root `v-bind="attrs"` with
  `:sx="[ownStyles, sx]"`, so a caller's `:sx` overrides per property rather
  than adding a second class for it. The lint rule `kirana/diagnostics` is off
  for these files (it reads the script block alone and reports that `sx` as
  unused); `vp run styles` and the Vue preview's build check them whole;
- declare only the component's own props, with a type written in the file:
  Vue resolves an imported props type through TypeScript's JavaScript API,
  which TypeScript 7 does not have. Ark's own props pass through as attributes,
  except those Ark requires, which a project's `vue-tsc` reports missing
  otherwise: declare each and pass it on. A plain one is typed in the file
  (a menu item's `value`, a checkbox item's `checked`, `SelectItem`'s `item` as
  `unknown`); one of an imported type is declared at runtime,
  `{ type: Object as PropType<…>, required: true }` (Select's `collection`). A
  listener, such as `v-model:checked`'s, still passes through as an attribute;
- Ark UI builds a select from a collection (`createListCollection`), so its
  `SelectItem` takes `item`, and every menu item a `value`.

## The site's pages

`apps/site` is the `ui` Worker. Its own pages (`/` and `/docs` so far) are drawn with the
registry's components on Base UI and take the registry's design on `<html>`, as a
preview does: the URL's design when it names one, else the reader's saved one (the
`kui-preset` cookie, a `k` code), else the default, written before the first paint by
`registry/core/design-script.ts` (`readPageDesign`). The **Customize** button in the site's
header and the docs bar (`apps/site/src/components/customizer.tsx`) opens a sheet with a picker
per axis; a choice goes through `setDesign` (`apps/site/src/lib/page-design.ts`): `<html>`'s
attributes at once, the cookie, the preset in a URL that names one, and upstream's
`design-system-params` message to every preview framed on the page. A framed preview without a
preset reads the cookie as it loads; the code panel shows the reader's style. `?theme=` is the
colour mode when its value is `light`, `dark` or `system`, and the design's colour theme
otherwise. The font picker offers the families the site loads (Inter, Geist). Their header is
`SiteHeader` (`apps/site/src/components/site-header.tsx`): a section joins its
navigation with its first page. `/docs` is the docs framework (`packages/docs-core` and
`packages/docs-ui`, copied from the Kirana site's, `packages/docs-ui/CHANGES.md`) over
`apps/site/content/docs`: `generate:content` (the workspace's `content` task, before every check
and build) parses it into `apps/site/src/generated`, not committed, with `llms.txt` and a markdown
twin per page. A page embeds an item's live preview with `<!-- ::preview item="button-demo" -->`.
Each ported component has a page, `apps/site/content/docs/components/<item>.md`: its preview with a
framework-and-base picker (`combinations="react/base,react/aria,vue/ark"`), the install commands
for both CLIs, usage per base (a `tabs` block headed Base UI, React Aria, Ark UI, which follows the
picker), and `<!-- ::component-code name="…" -->`, the files installing it writes, read from
`/r/<item>.json` in the browser. A component without an upstream demo the registry can draw shows
another item's (Label the Card's, Field the Input's, Sidebar `sidebar-07`). A `*-demo` preview is
centred on its page (`page.demo`, added by the preview route and the Vue app).
`/demo` is `packages/ui`'s demo, with its own
document and stylesheet, kept in step with kirana-lab's baselines
(`docs/workflows.md`) until `packages/ui` retires.

## The preview pages

Each item alone on a page, in the design its URL names, as upstream's
`/preview/<base>/<item>?preset=…` (so the conformance harness can open the same
item and preset on both sites):

| Route                                  | Served by                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `/preview/react/base/<item>`, `aria/…` | `apps/site`'s route, prerendered per item and base; the design by an inline script before paint |
| `/preview/vue/ark/<item>`              | `apps/preview-vue`, built into the Worker's static files (`ark/<item>.html`); port 3003 in dev  |

- **The design** is `?preset=` (a `k` code or shadcn/ui's `a` and `b` codes),
  upstream's axis parameters (`style`, `theme` …), and `rtl` and `pointer`;
  `registry/core/preview.ts` turns it into the attributes on `<html>`. A React
  preview is a static page in the default design: `registry/core/design-script.ts`,
  inline first in `<head>`, writes the URL's design before the first paint, and the
  page reads it from the router's location (`apps/site/src/lib/page-design.ts`),
  never the route's context, which a prerendered page took at build time. What
  `<html>` does not carry, the direction and the icon library, follows the URL once
  the page has hydrated.
- **Each item is its own chunk** (`*/previews.ts` maps names to `import()`s), so a
  preview downloads its item only: the dialog demo is 178 KB of script, gzip.
- **Live changes** come from the framing page as upstream's message,
  `{ type: "design-system-params", data: { preset, style, … } }`; the page takes
  the new design, and its URL with it, so a reload keeps it. The base and item
  stay the page's own.
- **The colour mode** is the site's: its cookie, or `?theme=`. In a frame, `D`
  is sent to the parent (`{ type: "dark-mode-forward" }`) as upstream's previews
  do.
- A preview page loads the registry's `reset.css` and fonts, never the demo's
  `globals.css`, whose rules would reach the registry's components.
- **Compared with upstream's own preview pages** by the conformance harness in
  URL-pair mode (`docs/workflows.md`): upstream reads a preset code over the axis
  parameters, so a comparison names the design with `?preset=`.

## The registry build (`packages/builder`)

`vp run registry` writes the registry into the site's static files,
`apps/site/dist/client/r`, in two formats:

- **Kirana's**, which `kirana-style ui` reads (`view`, `search`, and `add` to come):
  `r/<item>.json`, one item for every framework and base, and `r/index.json`.
  - The style modules travel as written, one source for every framework, since
    installation flattens them for a project's design.
  - Each base's markup travels on its own, with the packages and items only it
    needs.
  - Each item also carries its style modules flattened for every style and base
    (`flattened`), the very modules checked for the shadcn export, which
    `kirana-style ui add` takes for the project's design.
  - The `kirana` item describes the design (`design`): every axis with the
    attribute it sets on `<html>` and its values, `style` as the axis flattened
    for, and the preset layouts (`k`, and shadcn/ui's `a` and `b`), which
    `kirana-style ui preset <code>` reads.
  - A file names another installed file by its type and path, as the item lists
    it: `@/registry/<type>/<path>` (`@/registry/component/login-form`), which
    installation rewrites to the project's alias for the type.
- **shadcn/ui's**, for its CLI: `r/shadcn/<combination>/<item>.json`,
  `<combination>/registry.json` and `r/shadcn/index.json`, for every combination of
  `react-base`, `react-aria`, `vue-ark` and the eight styles, each style module
  flattened.

The `kirana` item is the design system: besides its tokens and axes it carries
the reset and its wiring, which `kirana-style ui init` follows: `installConfig`
(`core/kirana.ts`, `registryConfig` with the reset layer) spread into the project's
configuration, `reset.css` imported after Kirana's stylesheet, and `htmlStyles`
(`core/document.ts`: the colour scheme, page colours and font, the root tokens and
the axes' anchor) on `<html>`.

Two items exist for Kirana's format's sake. `sx` (React only) is the props helper
React components import. `control-styles` is the helper several style modules
import, which flattening inlines into shadcn/ui's.

| Module                           | Does                                                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `kirana-stub.ts`, `evaluate.ts`  | Runs a style module with Kirana's functions recording their arguments; tags the state keys of `core/states.ts` with their base      |
| `flatten.ts`                     | One style and one base: other styles' and bases' entries out, the style's merged into the base look                                 |
| `generate.ts`                    | Writes a module back as source: tokens, relations, targets and keyframes as code; each `css()` line                                 |
| `session.ts`                     | One Kirana session (`Driver` from `@kirana-style/compiler`): batched `trace()`, conditions as data, `check()` for diagnostics       |
| `check.ts`, `winners.ts`         | The round trip (recipes by part) and the winners, before and after; every probe in one module per side                              |
| `compose.ts`                     | Every composition of handles in the markup, as probes for the winners: merged live, and each handle flattened then merged           |
| `items.ts`, `registry.ts`        | The items, their files' places, imports rewritten, dependencies read, shadcn/ui's schema                                            |
| `kirana-items.ts`                | Kirana's format: an item's files shared by every base, each base's own, dependencies split the same way, the axes it reads          |
| `upstream.ts`, `upstream-cli.ts` | The provenance manifest (`upstream/shadcn.json`) and the scan against shadcn/ui at a commit; drafts with Kirana's Tailwind lowering |
| `kirana-check.ts`                | Kirana's items checked with `@kirana-style/registry`'s `check()`, and every dependency installable wherever its item is             |

An item's files install as markup and style modules in `ui/`, the design system
in `lib/kirana/`, a block's parts in `components/`; an import between items is
`@/registry/<combination>/…`, which shadcn/ui's CLI rewrites to the project's
aliases. A relation is declared by one module, which a flattened module imports
it from. A React component does not depend on the `icon-placeholder` item: the
CLI replaces its placeholders with the project's icon library
(`components.json`'s `iconLibrary`), whose package the project installs once.

## Layer 5 — primitives

| Component        | For                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `Box`            | A div with padding, background, radius props                                                 |
| `Flex` / `Stack` | Rows and columns. `Stack` is a `Flex` that defaults to column                                |
| `Grid`           | Column counts, gaps, `center`                                                                |
| `Text`           | Sizes, weights, colours, `truncate`, `clamp`, `heading`                                      |
| `Icon`           | **Always** use this instead of `HugeiconsIcon`. Reads `ctx.iconSize`; stroke defaults to 2   |
| `Link`           | Inline links. Replaces `[&_a]` descendant styling                                            |
| `VisuallyHidden` | Replaces `sr-only`. Capped at 1px wide, so a vertical Field's full-width rule cannot grow it |

Props index into precompiled tables in `primitives/styles.ts`. The vocabulary is
deliberately narrow: layout and the semantic palette, nothing else. Anything more
specific belongs in a component's own `css()`, where it is named and reviewable.

## Layer 6 — components

61 files in `components/`, each taking `sx?: Sx` instead of `className`.
`lib/sx.ts` has the `Sx` type (from `@kirana-style/core`, with the React augmentation
that types `sx` on every DOM and SVG element), `WithSx`, and `mergeSx`.

> Compose with an array, `sx={[a, b, sx]}`, on elements and components alike.
> `mergeSx(a, b)` is the same thing as a call, for props built outside JSX. For a
> Base UI part or any component from an installed package, spread
> `{...styleProps(a, sx)}` (`props` from `@kirana-style/core`, imported under that name
> because components name their rest parameter `props`).

Parts that style something the caller renders take a second style prop, named
for what it reaches:

| Component                 | Prop                              | Styles                                                                                         |
| ------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `Progress`                | `indicatorSx`                     | the filled bar it renders for you                                                              |
| `ComboboxInput`           | `inputSx`                         | the text input inside its InputGroup                                                           |
| `Calendar`                | `modifiersSx`                     | days carrying a modifier: `{ booked: { day, button } }`                                        |
| `Example` (apps/examples) | `containerSx`                     | the column around the title and card                                                           |
| `NavigationMenuLink`      | `sx={navigationMenuTriggerStyle}` | a plain link that should look like the triggers beside it                                      |
| `Sidebar`                 | `innerSx`                         | the inner panel holding the content, e.g. `flexDirection: "row"` for two side-by-side sidebars |
| `FieldSeparator`          | `contentSx`                       | the label that interrupts the line, e.g. its fill on a card                                    |

Some forms are detected rather than opted into, matching the original:
`FieldLabel` becomes a selectable card when it wraps a `Field`; a table body's
or footer's last row drops its rule; a `ToggleGroup`
joins its items at `spacing={0}` (it also accepts `1` and `2`). A `TabsTrigger`
reads its orientation and active state from Base UI and its list's variant from
context, so the line indicator needs no props. The unstyled `Collapsible` parts
keep a class another component hands them, so
`<SidebarMenuButton render={<CollapsibleTrigger />}>` still looks like the button.
`AlertIcon` renders the svg itself (`<AlertIcon icon={AlertCircleIcon} />`) and an
alert's descriptions turn destructive with the alert.

A component that forwards its props to a Base UI part or to an element must take
`sx` out of them and pass it on (`{...styleProps(a, sx)}` or `sx={[a, sx]}`): `sx`
left inside a spread reaches nothing, and the compiler reports it where the
component is used (`sx-on-external-component`).

## Global CSS

`styles/globals.css` holds what component styles do not reach, each block scoped
by the `data-slot` it serves:

| Block              | Why it is not a component style                                                                                 | Layer     |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | --------- |
| Reset              | Structural defaults, Tailwind's preflight where components relied on it                                         | `reset`   |
| Recharts internals | Markup a library renders with its own class names (the chart component)                                         | `base`    |
| Inline content     | Links and paragraphs a caller writes inside an alert, an accordion panel, or a field, empty or item description | `base`    |
| Calendar day meta  | A span a custom `DayButton` renders beneath the date                                                            | `base`    |
| Sidebar label      | The plain span a caller puts last in a sidebar menu button truncates                                            | `base`    |
| Field layout       | A Field stretches whatever children it is given, over their own width — as `*:w-full` did                       | unlayered |

None of it names a token: hashed names cannot be written in plain CSS. Where a
rule needs a theme colour, the component hands it down as a plain custom
property, as `--inline-link-hover` does.
