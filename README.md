# kirana/ui

[![ci](https://github.com/kirana-style/kirana-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/kirana-style/kirana-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

shadcn/ui's components, blocks, charts and examples, rebuilt on
[Kirana](https://github.com/kirana-style/kirana), a compile-time styling system, and
served as a registry you install from. Every style compiles to one layered, atomic
stylesheet at build time: there is no Tailwind, no `cn` and no runtime styling.

- **Every component of shadcn/ui's** on React: all 64 on [Base UI](https://base-ui.com),
  and the 61 [React Aria](https://react-spectrum.adobe.com/react-aria/) can carry (it has
  no menubar, navigation menu or toast), with every block, chart and example page.
- **All eight of shadcn/ui's styles** (Nova, Vega, Lyra, Maia, Mira, Luma, Rhea, Sera),
  its base colours, themes, chart colours, fonts and radii, chosen with a preset code
  (shadcn/ui's codes are read too).
- **One design, installed as yours.** A project receives each component flattened for its
  style and its design's colours alone, and changes design with one command.
- **Every framework from the same style modules**: Vue, Svelte and Solid on
  [Ark UI](https://ark-ui.com), and Angular on [ng-primitives](https://angularprimitives.dev),
  each installed with `kirana-style ui`; and Vue on [Reka UI](https://reka-ui.com) and Svelte on
  [Bits UI](https://bits-ui.com) too.

The site is at [ui.kirana-style.workers.dev](https://ui.kirana-style.workers.dev) until
`ui.kirana.style` is attached.

## Status

kirana/ui is before its first release. React is complete on both bases and checked
against shadcn/ui's own site, computed style by computed style. The other frameworks
follow React's pages, checked against them the same way: Vue has 61 of the components
(all but the three no Vue library carries: Menubar, Message Scroller and Questionnaire) with
their demos and example pages, the 29 blocks and the 70 charts, on Ark UI and on its second base, Reka UI, alike; Svelte and Solid have the same
61 with their demos and example pages, the 29 blocks and the 70 charts (Svelte on Bits UI, its second
base, has 60 of them, all but the toast); and
Angular has 62, Vue's 61 and Menubar (no Ark UI one exists; Angular's is the registry's own),
on ng-primitives and the registry's own parts, with their demos, example pages and right-to-left
demos, the 29 blocks and the 70 charts. Every framework installs with `kirana-style ui`, checked
from an empty folder on every change.

## Using it

Start a project from a skeleton the site serves (Get Code on the Create page writes the
commands for your framework, template, base, monorepo and tooling), set it to the design
you chose (its preset code), then add components:

```bash
npx @kirana-style/registry init --template @kirana/vite-react--none--eslint my-app \
  --framework react --base base --preset k0 \
  --registry @kirana=https://ui.kirana-style.workers.dev/r/{name}.json
cd my-app && npx kirana-style ui add button dialog sidebar-07
```

The template is one of the skeletons the site serves (`<template>--<monorepo>--<tooling>`:
Vite, TanStack Start, React Router, Next.js, Astro or Laravel on React; Vite or Nuxt on Vue;
Vite or SvelteKit on Svelte; Vite, SolidStart or TanStack Start on Solid; Analog or the
Angular CLI; alone, in a Turborepo or in a Vite+ monorepo; with ESLint + Prettier, Oxlint +
Oxfmt, Biome or Vite+), with `--framework` and `--base` (`ark`, or `ng` for Angular).
`kirana-style ui preset <code>` changes the design later, and `update`, `diff` and
`remove` keep the components in step with the registry. The `--registry` flag is needed
only until `ui.kirana.style` is live. Installation, every command and shadcn/ui's own
CLI are covered in the [documentation](https://ui.kirana-style.workers.dev/docs/installation).

Components take an `sx` prop in place of `className`. It is applied last, so a caller can
always override:

```tsx
import { css } from "@kirana-style/core"

import { Button } from "@/components/ui/button"

const styles = { pushEnd: css({ marginInlineStart: "auto" }) }

export function Save() {
  return (
    <Button variant="outline" size="sm" sx={styles.pushEnd}>
      Save
    </Button>
  )
}
```

## Repository

| Path                                     | Contents                                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------------- |
| `registry/core`                          | The design system: axes, tokens, scales, colours, preset codes                     |
| `registry/styles`                        | Each component's look, every style in one module                                   |
| `registry/bases`                         | Components, blocks and examples per framework and base, holding no style values    |
| `apps/site`                              | The site: docs, blocks, charts, `/create`; deployed as a Cloudflare Worker         |
| `apps/preview-*`                         | Each framework's preview app, built into the site's `/preview/<framework>/`        |
| `packages/builder`                       | The registry's JSON, every item checked with Kirana (`vp run registry`)            |
| `packages/docs-core`, `docs-ui`          | The docs framework                                                                 |
| `packages/shell`, `fonts`, `vite-config` | The site's shell and colour mode, the font families, the shared Vite config        |
| `upstream`, `conformance`                | What each item was ported from, and the reviewed differences from shadcn/ui's site |
| `scripts`                                | Kirana's version, licences, the install smoke test, conformance                    |

## Development

[Vite+](https://viteplus.dev) (`vp`) runs every task and installs the Node.js and Bun
versions the repository names; Kirana's engine is a prebuilt package, with nothing to
compile.

```bash
curl -fsSL https://vite.plus | bash   # once; then open a new terminal
vp install                            # dependencies and the git hooks
vp run dev                            # the site on :3000, the previews on :3003 to :3007
```

The site runs in workerd, Cloudflare's runtime, as it does in production.

| Command                                | What it does                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------- |
| `vp run build`                         | Every app, printing Kirana's diagnostics; it must report no errors                          |
| `vp run check`                         | Formatting, lint (with Kirana's rules) and types; a warning fails it                        |
| `vp run styles`                        | The registry's style modules through Kirana                                                 |
| `vp run test`                          | The unit tests                                                                              |
| `vp run registry`                      | The registry's JSON, every item validated and every flattened build checked                 |
| `vp run install`                       | The registry installed into new projects and built (needs the network)                      |
| `vp run conformance -- --pages <page>` | A page against shadcn/ui's own site (needs upstream served locally)                         |
| `vp run prepush`                       | What the pre-push hook and CI run: check, styles, tests, licences, build, registry, budgets |
| `bun scripts/use-kirana.ts <version>`  | Moves every Kirana package to one release                                                   |

`cd apps/site && bun run preview` serves the built site as its Worker on `:8787`.

## Contributing

Issues and pull requests are welcome. Before you start:

- Read [`docs/`](docs/README.md): how the design system is layered, how a Tailwind class
  maps to a Kirana style, what already exists, and how a component is added and checked.
- Port shadcn/ui's intent from its Base UI and React Aria bases, never its Radix base or
  its legacy `new-york-v4` registry.
- Work on a short-lived branch (`feat/…`, `fix/…`, `docs/…`); a pull request's title is a
  [Conventional Commit](https://www.conventionalcommits.org) in lower case.
- `vp run prepush` passes before you push; a change to a component's look is compared with
  shadcn/ui's site (`docs/workflows.md`).

The compiler, its packages and its specification are in
[kirana-style/kirana](https://github.com/kirana-style/kirana).

## Licence

[MIT](LICENSE). The components, blocks and examples are ported from
[shadcn/ui](https://github.com/shadcn-ui/ui) (MIT, Copyright (c) 2023 shadcn), whose
notice is in [`LICENSE`](LICENSE). kirana/ui is not affiliated with or endorsed by
shadcn/ui.
