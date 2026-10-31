# Changes from the Kirana repository's copy

`docs-core` and `docs-ui` are the Kirana site's docs framework, copied from
[kirana-style/kirana](https://github.com/kirana-style/kirana) (`packages/docs-core`,
`packages/docs-ui`) at commit `412565b` (Kirana 0.3.4). They are to be published from there as
`@kirana-style/docs-core` and `@kirana-style/docs-ui`, and these copies deleted. Until then, every
change made here is listed below, so the two can be compared and merged. Code is otherwise kept as
it was, names included.

## docs-core

- `variants.ts` (new), `generate.ts`, `pages.ts`, `types.ts`: a page published once per variant
  (a component per framework and base). A source listing `variants` in its frontmatter becomes a
  page per variant at `<folder>/<variant>/<name>`, narrowed by `::only` blocks, tabs headed by
  variant labels and embeds' `combinations`, with an optional override per variant
  (`<name>/<variant>.md`); `PageMeta.variant` carries the variant, the URL the variants share and
  the siblings. The nav, search, the pager (`ORDER`, `neighbours`) and `llms.txt` list a variant
  source once, at its shared URL; `defaultVariant()` finds where that URL leads; each variant has
  its twin, whose header names it and links the others, and the shared URL has the default
  variant's twin, so a link to it in another twin reads a page. `DocsConfig.variants` and
  `checkVariants` (the app's check against its source of truth). A candidate for the Kirana copy.
- `package.json`: no `test` script or coverage dependencies. The workspace's `vp run test` runs
  `test/`; `vitest.config.ts` (the coverage floor) is not copied.
- `tsconfig.json`: no `vitest.config.ts` in `include`.
- `generate.ts`, the markdown twins and `llms-full.txt`: `withoutTitle` (the page's own `# Title`
  is dropped, as the twin's header writes it), `plainBlocks` (a block's `::start:` and `::end:`
  markers are dropped) and `plainLinks` (links made absolute, a docs page's pointing at its twin,
  `/docs` at `/docs/index.md`). Candidates for the Kirana copy: its twins had the same three.
- `generate.ts`, the search text: inline code reads as its source (it was empty, so "With
  `kirana-style ui`, …" read "With , …"), and inline runs join without the space blocks get.
- `search.ts`: on a title match, the page's own record (before its first heading) ranks before its
  sections.

## docs-ui

### What the frame is drawn with

- `tokens.ts` (new): the registry's design-system tokens (`registry/core/tokens.ts`,
  `registry/core/scales.ts`) under the names the Kirana copy imports from `@workspace/ui`
  (`spacing`, `fontFamily`, `pointer`, the `textSize`/`textLeading`/`textTracking` roles). Every
  module imports its tokens from it, in place of `@workspace/ui/tokens/*` and
  `@workspace/ui/theme/semantic`, so the frame follows the design the reader chooses. The type roles
  are Tailwind's sizes, untracked, not the Kirana site's fluid roles.
- Components from the registry (`registry/bases/react-base/ui`): Button, Tabs, DropdownMenu,
  Separator, Sheet, Collapsible, Kbd (`search.tsx`, `theme-toggle.tsx`), Table
  (`markdown/index.tsx`), Alert (`markdown/callout.tsx`) and Command (`search-dialog.tsx`). `Sx`
  from `registry/lib/sx`.
- The mechanism, not the look, from `@workspace/shell` (the Kirana copy's `@workspace/ui`): the
  `Icon` primitive (reading the registry's `ctx.iconSize`), `touchTarget`, the theme provider and
  modes.
- `scheme.ts`: re-exports `@workspace/shell`'s `schemeMarker`, which the site anchors on `<html>`,
  instead of declaring a relation of the same name.
- `README.md`: the first paragraph says what this copy is drawn with; the rest still describes
  the Kirana copy's look (its hues, its fonts).
- `package.json`, `tsconfig.json`: `@workspace/registry`, `@workspace/shell` (for
  `@workspace/ui`) and `@kirana-style/preset-scales`; `@kirana-style/core` from the catalog.

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

- `markdown/installation.tsx` (new), registered as `installation`: `<!-- ::installation
  name="…" combinations="…" -->`, a component's Installation section as shadcn/ui's pages have
  it, Command and Manual. Manual's steps read the registry's documents: the project set up with
  `init`, the components the item uses, the packages its framework and base need, and every file
  it installs, its shared modules' included. `markdown/component-code.tsx` exports
  `RegistryItem` for it. `name` may list several items (`name="trace code-block"`), as an AI
  Elements pattern built from components does: the command adds them all, and Manual copies the
  first and lists the others among the components to add.
- `markdown/section-cards.tsx` (new), registered as `section-cards`: `<!-- ::section-cards
  section="…" -->`, a section's pages but its index as cards, each its title and description, as
  shadcn/ui's AI Elements page lists its patterns (`LinkedCard`). It reads the navigation.
- `markdown/code-block.tsx`: `collapsible` (new, optional): a file longer than sixteen lines is
  folded until expanded, from its header or the fade at its foot, as shadcn/ui's component source.
- `markdown/preview.tsx` (new), registered as `preview` in `createMarkdownComponents`:
  `<!-- ::preview item="…" height="…" -->`, an item's live preview in an iframe, from
  `DocsConfig.previewSrc` (new, optional). The frame is created once the page has hydrated, so it
  loads once, at its final address; the colour mode is not in the address (the framed page reads
  the site's mode and follows the theme provider's channel).

- `search.tsx` and `search-dialog.tsx` (new): the dialog, with cmdk, is its own module, loaded on
  the first open and fetched ahead when the pointer or the focus reaches a trigger, so a page no
  longer loads it up front (about 20 KB gzip of every docs page). The first hit is selected as the
  results arrive, so Enter opens it; cmdk selected nothing when the items came from our own filter,
  and Enter did nothing until an arrow key moved. The empty states' copy is this site's.

- `docs-layout.tsx`: `links` (new, optional), links after the last tab drawn as tabs and never
  active (the site's New, to its editor). The collapsed sidebar is a rail holding the button that
  opens it again, no longer a column of the tabs' icons, which repeated the tab row beside it.

- `markdown/frameworks.tsx` (new), registered as `frameworks`: a variant page's siblings as tabs,
  each a link, the page's own chosen. `combination.ts`: a variant page's combination wins over the
  saved choice. `docs-layout.tsx`: the section of a `current` that is a variant source's shared
  URL is its variants'.
- `theme-toggle.tsx`: `keycap` (new, optional, `hotkey` by default) shows the `D` chip on a toggle
  that does not listen for the key itself, as the site's footer, whose header listens for it.
- `markdown/preview.tsx`: `CombinationPicker` takes `sx`, for a page that sets it in a row of its
  own (the charts pages' types).
- `combination.ts` (new): the framework and base a component page shows, one choice for the whole
  site, kept in localStorage (`docs-ui:combination`), from `DocsConfig.combinations` (new).
- `combination.ts`: `useSavedCombination()`, the saved choice without the provider, for the site's
  home showcase, whose framework switch shares it.
- `markdown/preview.tsx`: `combinations="react/base,react/aria"` puts a picker over the preview and
  passes the choice to `previewSrc(item, combination)`.
- `markdown/component-code.tsx` (new), registered as `component-code`: the files installing an item
  writes, fetched from its registry document (`DocsConfig.registryItem`, new) for the chosen
  combination and style (`DocsConfig.codeStyle`, new), at the default aliases, highlighted in the
  browser with docs-core's highlighter, loaded on demand.
- `markdown/tabs.tsx`: a tab group whose headings are all combinations' labels follows the shared
  choice instead of `?tab=` (framework and base tabs on code blocks).
- `markdown/demo-code.tsx` (new), drawn by `markdown/preview.tsx` under every preview, in one
  bordered box with it, as shadcn/ui's component preview: the demo's code, fetched from
  `DocsConfig.demoCode` (new) for the reader's combination and icon library
  (`DocsConfig.iconLibrary`, new), folded to three lines under a View Code button, highlighted in the
  browser with docs-core's highlighter.
- `markdown/preview.tsx`: `direction="rtl"` (new) draws a right-to-left demo as shadcn/ui's
  component preview does: a bar over it with the language it is read in (Arabic first, Hebrew,
  English) and a note that the translations are made with AI. The frame opens at `?lang=ar` and
  takes the next language by message (`LANGUAGE_MESSAGE` from `@workspace/registry/core/preview`),
  so it is not reloaded. The selector is the registry's `LanguageSelector`, on Base UI.
- `markdown/demo-code.tsx`: `rtl` (new) puts upstream's note over a right-to-left demo's code: it
  sets `dir` and its language itself because the site reads left to right, and links the guide,
  `DocsConfig.rtlGuide` (new, optional).
- `docs-page.tsx`: `headings` (new, required) is the table of contents, from the page's own document
  (`pageHeadings` in docs-core's `pages.ts`). The manifest's page entries no longer carry their
  headings: every page of the site loaded every docs page's sections in its first chunk, which grew
  with each page.
- `docs-page.tsx`: shadcn/ui's neighbours. The previous and next pages' arrows sit beside "Copy page"
  (secondary icon buttons), and the pager under the article is two secondary buttons, each the
  page's title with an arrow, where it was two cards with "Previous" and "Next" over the titles.
- `markdown/demo-code.tsx`: an expanded demo's code folds again (a button beside the copy button),
  which shadcn/ui's cannot.
- `markdown/frameworks.tsx`: the chosen base's logo at the end of the variant tabs, as shadcn/ui's
  base switcher shows it (its marks for Base UI and React Aria).
- `markdown/preview.tsx`: a corner button opens the framed page alone in a new tab;
  `surface="true"` (new) gives the page shadcn/ui's `bg-surface` (`?surface=true`, read by the
  registry's preview pages); every frame is told the page's width (`?pagewidth=`), which the preview
  answers width media queries from, so a demo's script reads what an inline one would.
- `markdown/index.tsx`: headings link to themselves with shadcn/ui's `#` on hover (`HeadingAnchor`);
  `<!-- ::start:steps -->` … `<!-- ::end:steps -->` (new) is shadcn/ui's `<Steps>`, each h3 in it a
  numbered step on a line.
- `markdown/preview.tsx`: `code="false"` (new) draws the preview without its code, as shadcn/ui's
  `hideCode`.
- `markdown/preview.tsx`: `block="true"` (new) shows a block as shadcn/ui's `type="block"` preview
  does: the page in a 1600px frame clipped by a `4 / 2.5` box (at its start for a right-to-left
  demo), without the code; `caption` (new) puts a line under the box.
- `markdown/figure.tsx` (new), registered as `figure`: `<!-- ::figure light="…" dark="…" alt="…"
  caption="…" -->`, an illustration in the site's colour scheme with its caption.
- `markdown/preview.tsx`: `wide="true"` (new) makes the frame as wide as the page, centred in the
  box and clipped by it, so a demo's CSS breakpoints read the page's width as shadcn/ui's inline
  demos do (an item that is `hidden md:flex`).
- `markdown/demo-source.tsx` (new), registered as `demo-source`: `<!-- ::demo-source item="…"
  title="…" combinations="…" -->`, a demo's whole code as a titled, foldable code block, as
  shadcn/ui's `ComponentSource` shows a file (its Forms guides end on the finished form).
