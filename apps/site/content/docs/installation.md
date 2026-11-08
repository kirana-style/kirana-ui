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
    next.js,
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

[Get Code](/create), on the Create page, writes the commands for the project you choose:
the framework, its template, the base, whether the app stands alone or in a Turborepo or
a Vite+ monorepo, and what lints, formats and type-checks it. Three steps, for npm, pnpm,
Yarn, Bun or Vite+'s `vp`:

```sh
npx giget@3.3.1 https://ui.kirana-style.workers.dev/templates/vite-react--none--eslint.tgz my-app
cd my-app && npm install && npx kirana-style ui init --framework react --base base --preset k0 --registry @kirana=https://ui.kirana-style.workers.dev/r/{name}.json
```

The first unpacks a skeleton: the app as Kirana's own example for that framework has it
(its Vite, Next.js or Angular configuration, Kirana's plugin, a welcome page), with the
`@/*` alias mapped, `dev`, `build` and `preview` scripts, and the tooling you chose with
its `lint`, `format` and `typecheck` scripts, Kirana's rules included. The second installs
its packages and runs `init`, which installs the design system in your design and wires it
in. In a monorepo the app is `apps/web`, and `init` runs there.

`k0` is the default design. A [preset code](/docs/presets) holds every axis of a design in
a few characters. `--pointer` gives the buttons a pointer cursor and `--rtl` sets the page
right to left: each writes its attribute on `<html>`
([Button](/docs/components/button#cursor), [Right to left](/docs/design-system/rtl)). The
project gets that design alone, its style's values and its colours; `--all-designs` keeps
every design, for a design picker of your own
([Colours and theming](/docs/design-system/theming#in-your-project)).

Every skeleton is listed at
[`templates/index.json`](https://ui.kirana-style.workers.dev/templates/index.json), by its
name: `<template>--<monorepo>--<tooling>`. `init --template <example>` still starts from
one of [Kirana's examples](https://github.com/kirana-style/kirana/tree/main/packages/kirana/examples)
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

| Framework | Base                  | Template                                         | Components |
| --------- | --------------------- | ------------------------------------------------ | ---------- |
| React     | Base UI or React Aria | `vite-react`, `tanstack-start`, `next-turbopack` | 64, 61     |
| Vue       | Ark UI                | `vite-vue`                                       | 61         |
| Svelte    | Ark UI                | `vite-svelte`                                    | 61         |
| Solid     | Ark UI                | `vite-solid`, `solid-start`                      | 61         |
| Angular   | ng-primitives         | `analog-angular`, `angular-cli`                  | 62         |

Every framework has the blocks and the charts too. Each template is named after Kirana's
example it was built from; `--framework` and `--base` tell `init` which components to
install where the project does not say.

## Monorepos

A skeleton can put the app in a workspace, as `apps/web`, with `packages/*` beside it:

- **Turborepo**: `turbo.json` with `build`, `dev`, `lint`, `format` and `typecheck`
  tasks, which the root's scripts run across the workspace. Turborepo reads the package
  manager from the root's `packageManager`, so the skeleton is packed once per package
  manager and the runner you pick in Get Code chooses the file.
- **Vite+ monorepo**: the root's `vite.config.ts` holds the format and lint settings,
  `vp run -r build` builds every package and `vp check` formats, lints and type-checks the
  workspace. A Vite+ project runs with `vp`, and Get Code locks its commands to it.

Components install into the app, under its `@/` alias: `kirana-style ui` reads one project
at a time. A shared `packages/ui`, as shadcn/ui's monorepo has, waits on a workspace-aware
installer on Kirana's list.

## Lint, format and types

Each skeleton comes with one of four toolings, each carrying Kirana's rules (the compiler's
diagnostics where the code is written, `sx` last, no `className` beside `sx`, nothing
unused):

| Tooling           | Lint                                                            | Format   | Types                            |
| ----------------- | --------------------------------------------------------------- | -------- | -------------------------------- |
| ESLint + Prettier | ESLint with `@kirana-style/eslint-plugin`                       | Prettier | `tsc`, `vue-tsc`, `svelte-check` |
| Oxlint + Oxfmt    | Oxlint with the same plugin                                     | Oxfmt    | the same                         |
| Biome             | Biome with `@kirana-style/biome-plugin`                         | Biome    | the same                         |
| Vite+             | `vp check`: Oxlint with the plugin, Oxfmt and TypeScript in one |          |                                  |

Vite+, as a tooling or a monorepo, goes with Vite's build: not with Next.js's or the
Angular CLI's. A Vite+ monorepo is checked by Vite+ alone, and a Turborepo runs one of the
other three. The rules are set as this repository runs them on the registry, which the
installed components pass: `no-dark-variant` off (a few ports keep upstream's
`prefers-color-scheme` on purpose) and the compiler's `relation-unused` ignored (a relation
one component anchors is read by another you may not have installed).

Each skeleton CI installs from an empty folder gets every component its framework has,
then its `format`, `lint`, `typecheck` and `build` scripts run, it moves to another design
with `ui preset` and back, and its lockfile is checked: React on Vite with ESLint and
TanStack Start in a Turborepo with Oxlint, Vue with Biome, Svelte in a Vite+ monorepo,
Solid with Oxlint and Analog with ESLint, on every change to this repository. Next.js,
SolidStart and the Angular CLI were installed and built by hand when they were added.

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
