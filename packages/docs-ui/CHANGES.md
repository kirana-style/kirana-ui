# Changes from the Kirana repository's copy

`docs-core` and `docs-ui` are the Kirana site's docs framework, copied from
[kirana-style/kirana](https://github.com/kirana-style/kirana) (`packages/docs-core`,
`packages/docs-ui`) at commit `412565b` (Kirana 0.3.4). They are to be published from there as
`@kirana-style/docs-core` and `@kirana-style/docs-ui`, and these copies deleted. Until then, every
change made here is listed below, so the two can be compared and merged. Code is otherwise kept as
it was, names included.

## docs-core

- `package.json`: no `test` script or coverage dependencies. The workspace's `vp run test` runs
  `test/`; `vitest.config.ts` (the coverage floor) is not copied.
- `tsconfig.json`: no `vitest.config.ts` in `include`.

## docs-ui

### What the frame is drawn with

- `tokens.ts` (new): the registry's design-system tokens (`registry/core/tokens.ts`,
  `registry/core/scales.ts`) under the names the Kirana copy imports from `@workspace/ui`
  (`spacing`, `fontFamily`, `pointer`, the `textSize`/`textLeading`/`textTracking` roles). Every
  module imports its tokens from it, in place of `@workspace/ui/tokens/*` and
  `@workspace/ui/theme/semantic`, so the frame follows the design the reader chooses. The type roles
  are Tailwind's sizes, untracked, not the Kirana site's fluid roles.
- Components from the registry (`registry/bases/react-base/ui`): Button, Tabs, DropdownMenu,
  Separator, Sheet and Collapsible. `Sx` from `registry/lib/sx`.
- Still from `@workspace/ui` until the registry has them: Kbd (`search.tsx`, `theme-toggle.tsx`),
  Table (`markdown/index.tsx`), Alert (`markdown/callout.tsx`), Command (`search.tsx`); and the
  mechanism, not the look: the `Icon` primitive, `touchTarget`, the theme provider and modes.
- `scheme.ts`: re-exports `@workspace/ui`'s `schemeMarker`, which the site anchors on `<html>`,
  instead of declaring a relation of the same name.
- `README.md`: the first paragraph says what this copy is drawn with; the rest still describes
  the Kirana copy's look (its hues, its fonts).
- `package.json`, `tsconfig.json`: `@workspace/registry` and `@kirana-style/preset-scales`;
  `@kirana-style/core` from the catalog.

### The Kirana brand, taken out

kirana-ui's look follows shadcn/ui, not kirana.style's brand:

- `accent.ts`: every accent name (`forest`, `lake` …) is the design's foreground; the scene hues and
  the brand's gold (`SUN`) are gone. The names and `tint()` are kept, so the API is the same.
- `markdown/code-block.tsx`: "Do" in Tailwind's green, not the brand's forest.
- `markdown/callout.tsx`: the comment on caution, no longer a scene hue.
- `docs-page.tsx`: the pager's hover fills with `muted`, as shadcn/ui's quiet hovers do, instead of
  the brand's lift (`@workspace/ui/recipes/lift`, which kirana-ui does not have).
- `markdown/index.tsx`: the title and section headings in shadcn/ui's docs weights (`h1`
  `text-3xl font-semibold tracking-tight xl:text-4xl`, `h2` `text-xl font-medium tracking-tight`),
  where the Kirana copy sets its serif heading face in the normal weight.

### Added for kirana-ui

Candidates for the Kirana copy, which would serve any registry's docs:

- `markdown/preview.tsx` (new), registered as `preview` in `createMarkdownComponents`:
  `<!-- ::preview item="…" height="…" -->`, an item's live preview in an iframe, from
  `DocsConfig.previewSrc` (new, optional). The frame is created once the page has hydrated, so it
  loads once, at its final address; the colour mode is not in the address (the framed page reads
  the site's mode and follows the theme provider's channel).

- `docs-layout.tsx`: `links` (new, optional), links after the last tab drawn as tabs and never
  active (the site's New, to its editor). The collapsed sidebar is a rail holding the button that
  opens it again, no longer a column of the tabs' icons, which repeated the tab row beside it.

- `combination.ts` (new): the framework and base a component page shows, one choice for the whole
  site, kept in localStorage (`docs-ui:combination`), from `DocsConfig.combinations` (new).
- `markdown/preview.tsx`: `combinations="react/base,react/aria"` puts a picker over the preview and
  passes the choice to `previewSrc(item, combination)`.
- `markdown/component-code.tsx` (new), registered as `component-code`: the files installing an item
  writes, fetched from its registry document (`DocsConfig.registryItem`, new) for the chosen
  combination and style (`DocsConfig.codeStyle`, new), at the default aliases, highlighted in the
  browser with docs-core's highlighter, loaded on demand.
- `markdown/tabs.tsx`: a tab group whose headings are all combinations' labels follows the shared
  choice instead of `?tab=` (framework and base tabs on code blocks).
