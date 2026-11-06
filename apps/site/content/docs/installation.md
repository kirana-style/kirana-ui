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
    vite,
    tanstack start,
    next.js,
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

Start from one of Kirana's example apps. In an empty folder, the registry package
runs on its own:

<!-- ::install run="@kirana-style/registry init --template vite-react my-app" -->

`--template` takes the example's name, and the folder to create after it. The
project it writes has `@kirana-style/registry` beside Kirana's other packages, each
at the release you ran, so `kirana-style ui` works there from then on.

Give the design you chose with its preset code, and the base for React:

<!-- ::install run="@kirana-style/registry init --template vite-react my-app --base base --preset k0" -->

`k0` is the default design. A [preset code](/docs/presets) holds every axis of a
design in a few characters. `--pointer` gives the buttons a pointer cursor and `--rtl`
sets the page right to left: each writes its attribute on `<html>`
([Button](/docs/components/button#cursor), [Right to left](/docs/design-system/rtl)).
The project gets that design alone, its style's values and its colours;
`--all-designs` keeps every design, for a design picker of your own
([Colours and theming](/docs/design-system/theming#in-your-project)).

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

| Framework | Base                  | Template                       | Components |
| --------- | --------------------- | ------------------------------ | ---------- |
| React     | Base UI or React Aria | `vite-react`, `tanstack-start` | 64, 61     |
| Vue       | Ark UI                | `vite-vue`                     | 61         |
| Svelte    | Ark UI                | `vite-svelte`                  | 61         |
| Solid     | Ark UI                | `vite-solid`                   | 61         |
| Angular   | ng-primitives         | `analog-angular`               | 62         |

Every framework has the blocks and the charts too. Give `init` the template for
your framework, and `--framework` and `--base` where the template does not say:

<!-- ::install run="@kirana-style/registry init --template vite-svelte my-app --framework svelte --base ark --preset k0" -->

Each framework is installed from an empty folder with every component it has,
built, moved to another design with `ui preset` and back, and checked, on every
change to this repository; `tanstack-start` was checked by hand. Next.js's template
(`next-turbopack`) is set up by `init`, which gives it the `tsconfig.json` Next.js
writes only on its first run; kirana/ui's components are not checked there yet.

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
