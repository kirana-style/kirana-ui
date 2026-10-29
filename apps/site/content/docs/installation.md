---
title: Installation
description: Start a project with kirana/ui's design system, or add it to one you have, with kirana-style ui.
section: start
order: 2
keywords: [install, init, template, vite, tanstack start, next.js, vue, setup]
---

# Installation

kirana/ui installs with `kirana-style ui`, Kirana's registry client. It sets Kirana
up where a project lacks it, installs the design system and wires it in, and then
copies each component you add into your project.

## A new project

Start from one of Kirana's example apps. In an empty folder, the registry package
runs on its own:

<!-- ::install run="@kirana-style/registry init --template vite-react my-app" -->

`--template` takes the example's name, and the folder to create after it. The
project it writes has `@kirana-style/registry` beside Kirana's other packages, each
at the release you ran, so `kirana-style ui` works there from then on.

Give the design you chose with its preset code, and the base for React:

<!-- ::install run="@kirana-style/registry init --template vite-react my-app --base base --preset k0" -->

`k0` is the default design. A [preset code](/docs/presets) holds every axis of a
design in a few characters.

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

| Framework | Base                  | Templates checked                 |
| --------- | --------------------- | --------------------------------- |
| React     | Base UI or React Aria | `vite-react`, `tanstack-start`    |
| Vue       | Ark UI                | `vite-vue` (its seven components) |

Each combination is installed from an empty folder, built and checked on every
change to this repository; `tanstack-start` was checked by hand. Next.js's
template (`next-turbopack`) does not install yet: it has no `tsconfig.json` until
Next.js first runs, and `init` stops where it would add the alias.

Svelte and Solid (on Ark UI) and Angular (on ng-primitives) have their first
components in the registry: Button, Card and Skeleton, each drawn on the site as
it draws on React. Installing into those frameworks is not checked yet.

## The fonts

The design's font is a variable token, so every component follows it, but the
font's files come from an item per family, `font-<name>`, which installs its
package and imports its stylesheet once, after Kirana's. `init` with a preset
installs the families the preset names; for the default, Inter:

<!-- ::install exec="kirana-style ui add font-inter" -->

A project that loads Kirana's stylesheet through PostCSS (Next.js's `@kirana;`)
is told to add the import by hand. The [fonts](/docs/design-system/fonts) page
names every family's item.
