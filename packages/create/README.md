# @workspace/create

What Get Code starts a project from, as data and pure functions, so the dialog, the site's build
and the install check agree and a new option is one entry.

| Module        | Holds                                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `catalog.ts`  | the frameworks and bases (the registry's), the templates per framework, the monorepos, the toolings, the runners, the project's names and the site's URLs                                   |
| `choices.ts`  | `ProjectChoices`, the rules between them (`resolveChoices`, `monoreposFor`, `toolingsFor`), the skeleton's id (`<template>--<monorepo>--<tooling>`) and `everySkeleton()`                   |
| `apps/*.ts`   | one `AppSkeleton` per template: its files, manifest parts, scripts, type check and Vite config spec, built from Kirana's example of the same name with a welcome page in place of the probe |
| `tooling.ts`  | the ESLint + Prettier, Oxlint + Oxfmt, Biome and Vite+ layers: configuration files, scripts, packages, Kirana's rules as this repository runs them                                          |
| `monorepo.ts` | the Turborepo and Vite+ workspace roots around `apps/web`                                                                                                                                   |
| `compose.ts`  | `composeProject(skeleton, versions, options)`: every file of the project, deterministic                                                                                                     |
| `commands.ts` | the three steps Get Code writes (`giget`, install, `kirana-style ui init`) and their lines per runner                                                                                       |
| `tar.ts`      | the tarball the site serves, which `giget` unpacks                                                                                                                                          |
| `versions.ts` | every package range the skeletons name, in one table                                                                                                                                        |

`scripts/templates.ts` (`vp run templates`) packs every skeleton into `apps/site/dist/client/templates/`
with `index.json`; `scripts/install-smoke.ts` (`vp run install`) composes one, installs it, runs
`init` and `add`, then its `format`, `lint`, `typecheck` and `build` scripts.

## Adding

- **A template:** an `AppSkeleton` in `apps/`, listed in `apps/index.ts`, its name in
  `catalog.ts`'s `TEMPLATES` and `TEMPLATE_LABELS`, its logo in the dialog's `TEMPLATE_ICONS`,
  `isViteTemplate` in `choices.ts` when Vite builds it; then `bun scripts/install-smoke.ts
  <framework>-<base>-<style>@<template>--none--eslint` and the Installation page's table.
- **A tooling:** a case in `tooling.ts`'s `toolingLayer`, its name in `TOOLINGS` and
  `TOOLING_LABELS`, its packages in `versions.ts`, any rule between it and the monorepos in
  `toolingsFor`, its logo in the dialog; the install check with it on one framework.
- **A monorepo:** a branch in `monorepo.ts`'s `workspaceLayer`, its name in `MONOREPOS` and
  `MONOREPO_LABELS`, its rules in `monoreposFor` and `toolingsFor`.

Every combination is composed in the tests (`test/create.test.ts`), so a layer that breaks another's
assumptions shows there before the site builds.
