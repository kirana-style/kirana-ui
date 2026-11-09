---
title: Installation
description: Start a project with kirana/ui's design system, or add it to one you have, with kirana-style ui.
section: start
order: 2
keywords:
  [
    install,
    init,
    template,
    turborepo,
    monorepo,
    eslint,
    oxlint,
    biome,
    prettier,
    vite,
    tanstack start,
    react router,
    next.js,
    astro,
    laravel,
    nuxt,
    sveltekit,
    solidstart,
    angular cli,
    vite+,
    vue,
    svelte,
    solid,
    angular,
    analog,
    setup,
  ]
---

# Installation

kirana/ui installs with `kirana-style ui`, Kirana's registry client. It sets Kirana
up where a project lacks it, installs the design system and wires it in, and then
copies each component you add into your project.

## A new project

[Get Code](/create), on the Create page, writes the command for the project you choose:
the framework, its template, the base, whether the app stands alone or in a Turborepo or
a Vite+ monorepo, and what lints, formats and type-checks it. One command, for npm, pnpm,
Yarn, Bun or Vite+'s `vp`:

```sh
npx @kirana-style/registry init --template @kirana/vite-react--none--eslint my-app --framework react --base base --preset k0 --registry @kirana=https://ui.kirana-style.workers.dev/r/{name}.json
```

`init --template` fetches the skeleton from this registry's templates, installs it with the
package manager you ran it with, and installs the design system in your design, wired in. The
skeleton is the app as Kirana's own example for that framework has it (its Vite, Next.js or
Angular configuration, Kirana's plugin, a welcome page), with the `@/*` alias mapped, `dev`,
`build` and `typecheck` scripts, and the tooling you chose with its `lint` and `format`
scripts, Kirana's rules included. In a monorepo the app is `apps/web` and the components go
into `packages/ui`.

`k0` is the default design. A [preset code](/docs/presets) holds every axis of a design in
a few characters. `--pointer` gives the buttons a pointer cursor and `--rtl` sets the page
right to left: each writes its attribute on `<html>`
([Button](/docs/components/button#cursor), [Right to left](/docs/design-system/rtl)). The
project gets that design alone, its style's values and its colours; `--all-designs` keeps
every design, for a design picker of your own
([Colours and theming](/docs/design-system/theming#in-your-project)).

Every skeleton is listed at
[`r/templates/index.json`](https://ui.kirana-style.workers.dev/r/templates/index.json), by
its name: `<template>--<monorepo>--<tooling>`. `init --template <example>` still starts
from one of [Kirana's examples](https://github.com/kirana-style/kirana/tree/main/packages/kirana/examples)
as they are, with their `build` script alone:

<!-- ::install run="@kirana-style/registry init --template vite-react my-app --preset k0" -->

> [!NOTE] Before the launch
> `kirana-style ui` looks for kirana/ui's registry at `ui.kirana.style`, which is
> not attached yet. Until it is, name the registry where it is served today, once,
> when you run `init`; the project keeps it:
> `--registry @kirana=https://ui.kirana-style.workers.dev/r/{name}.json`.

## A project you have

In a project with a `package.json`, add the registry package and run `init`:

<!-- ::install dev="@kirana-style/registry" exec="kirana-style ui init" -->

`init` works on an app that already uses Kirana and on one that does not:

- it sets Kirana up where the project lacks it;
- it maps the `@/*` alias in `tsconfig.json` when the project has none, and tells
  Vite to read it;
- it installs the design system and wires it in: its configuration in
  `kirana.config.ts`, its reset beside Kirana's stylesheet, and its styles on
  `<html>`.

What it cannot change safely, it prints as a step to do by hand. A template's own
styles for `:root` and `body` (Vite's `src/index.css`) still apply over the design
system's: remove them, as you would for shadcn/ui.

## Then add components

<!-- ::install exec="kirana-style ui add button dialog" -->

Each component comes with the ones it needs, and its files land under
`@/components/ui`. [kirana-style ui](/docs/cli) has every command.

## Frameworks and templates

| Framework | Base                  | Template                                                                                           | Components |
| --------- | --------------------- | -------------------------------------------------------------------------------------------------- | ---------- |
| React     | Base UI or React Aria | `vite-react`, `tanstack-start`, `react-router`, `next-turbopack`, `astro-react`, `laravel-inertia` | 64, 61     |
| Vue       | Ark UI                | `vite-vue`, `nuxt`                                                                                 | 61         |
| Svelte    | Ark UI                | `vite-svelte`, `sveltekit`                                                                         | 61         |
| Solid     | Ark UI                | `vite-solid`, `solid-start`, `tanstack-start-solid`                                                | 61         |
| Angular   | ng-primitives         | `analog-angular`, `angular-cli`                                                                    | 62         |

Every framework has the blocks and the charts too. Each template is named after Kirana's
example it was built from; `--framework` and `--base` tell `init` which components to
install where the project does not say. Astro's components are React islands
(`client:load`); Laravel's skeleton is the smallest Laravel app that serves one Inertia page
(`composer install` and `php artisan key:generate` set the PHP side up, `vite build` needs
none of it).

Two templates leave `init` a step for you, which it prints at the end. On Nuxt, no file
renders `<html>`: put the attributes it lists on the `<Html>` in `app/app.vue`, with
`:sx="htmlStyles"` and its import. On SvelteKit, `init` does not read `+layout.svelte` as
the file importing Kirana's stylesheet: add the font's import it names after that
stylesheet (the skeleton already imports the reset there, and sets `<html>`'s styles in
`src/hooks.server.ts`). Both are on Kirana's list.

## Monorepos

A skeleton can put the app in a workspace, as `apps/web`, with the components in
`packages/ui` (`@workspace/ui`), as shadcn/ui's monorepo has them: `init` runs in the app
with `--workspace packages/ui`, makes the package a Kirana project, and maps
`@workspace/ui/*` in both, so the app imports `@workspace/ui/components/button`. Every later
`ui add` from the app installs into the package.

- **Turborepo**: `turbo.json` with `build`, `dev` and `typecheck` tasks, which the root's
  scripts run across the workspace; `lint` and `format` run at the root, whose configuration
  reads every package. Turborepo reads the package manager from the root's `packageManager`,
  which `init` fills with the one that ran it.
- **Vite+ monorepo**: the root's `vite.config.ts` holds the format and lint settings,
  `vp run -r build` builds every package and `vp check` formats, lints and type-checks the
  workspace. A Vite+ project runs with `vp`, and Get Code locks its commands to it.

## Lint, format and types

Each skeleton comes with one of four toolings, each carrying Kirana's rules (the compiler's
diagnostics where the code is written, `sx` last, no `className` beside `sx`, nothing
unused):

| Tooling           | Lint                                                            | Format   |
| ----------------- | --------------------------------------------------------------- | -------- |
| ESLint + Prettier | ESLint with `@kirana-style/eslint-plugin`                       | Prettier |
| Oxlint + Oxfmt    | Oxlint with the same plugin                                     | Oxfmt    |
| Biome             | Biome with `@kirana-style/biome-plugin`                         | Biome    |
| Vite+             | `vp check`: Oxlint with the plugin, Oxfmt and TypeScript in one |          |

The type check is each package's own `typecheck` script (`tsc`, `vue-tsc`, `svelte-check`,
`nuxt typecheck`), which the root runs in a workspace. Vite+, as a tooling or a monorepo,
goes with Vite's build: not with Next.js's, React Router's, Nuxt's, Astro's or the Angular
CLI's, each with a command of its own over Vite or none. SvelteKit takes Vite+ as a monorepo
only: `svelte-check` reads the app's Vite config for the Svelte plugin and cannot load Vite+'s,
so the app's config stays Vite's and the root checks the workspace. A Vite+ monorepo is checked by Vite+ alone, and a Turborepo runs one of the
other three. The rules are set as this repository runs them on the registry, which the
installed components pass: `no-dark-variant` off (a few ports keep upstream's
`prefers-color-scheme` on purpose) and the compiler's `relation-unused` ignored (a relation
one component anchors is read by another you may not have installed); Biome's recommended
rules less the ten the ports trip as upstream's code does (a span with `role="link"`, an
index key, `import * as React` read for types …), listed in its `biome.json`.

Each skeleton CI installs with Get Code's own command from an empty folder gets every
component its framework has, then its `format`, `lint`, `typecheck` and `build` scripts
run, it moves to another design with `ui preset` and back, and its lockfile is checked:
React on Vite with ESLint and React Router in a Turborepo with Oxlint, Nuxt with Biome,
SvelteKit in a Vite+ monorepo, TanStack Start on Solid with Oxlint and Analog with ESLint,
on every change to this repository. The other templates were installed and built by hand
when they were added.

An icon is your icon library's own component where the library has a package for
your framework. Where it has none, and on Angular for every library, `ui add`
writes the icon into the file as an inline `<svg>`, read from the library's
published data, with the library's licence notice in a comment.

## The fonts

The design's font is a variable token, so every component follows it, but the
font's files come from an item per family, `font-<name>`, which installs its
package and imports its stylesheet once, after Kirana's. `init` with a preset
installs the families the preset names; for the default, Inter:

<!-- ::install exec="kirana-style ui add font-inter" -->

A project that loads Kirana's stylesheet through PostCSS (Next.js's `@kirana;`)
is told to add the import by hand. The [fonts](/docs/design-system/fonts) page
names every family's item.
