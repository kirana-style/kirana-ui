---
title: Introduction
description: shadcn/ui's design system on your framework and your headless library, compiled by Kirana and installed into your own project.
section: start
order: 1
keywords:
  [
    kirana ui,
    shadcn,
    components,
    registry,
    design system,
    react,
    vue,
    svelte,
    solid,
    angular,
  ]
---

# Introduction

Kirana UI is shadcn/ui's design system on your framework and your headless
library: React, Vue, Svelte, Solid or Angular, on the library you already use or
on Kirana UI Primitives, the family's own. Each component's look is written once,
as typed styles that [Kirana](https://kirana.style) compiles into one plain
stylesheet, so a button is the same button on every one of them. There is no
Tailwind and no class names to merge.

The components, blocks and styles are [shadcn/ui](https://ui.shadcn.com)'s, and
so is the way you get them: you do not install a component library. You copy
each component's source into your project, and from then on it is yours to
change.

<!-- ::preview item="button-demo" -->

## What you get

- **Every style.** Vega, Nova, Maia, Lyra, Mira, Luma, Rhea and Sera, each the
  same design as on shadcn/ui's site.
- **Every design axis.** Base colour, theme, chart colours, fonts, radius, the
  icon library and menus, chosen once and carried in a short preset code.
- **Your framework, your headless library.** One style module per component
  draws it on each of these:

  | Framework | Headless libraries                                |
  | --------- | ------------------------------------------------- |
  | React     | Kirana UI Primitives, Base UI, React Aria, UI SDK |
  | Vue       | Kirana UI Primitives, Ark UI, Reka UI, UI SDK     |
  | Svelte    | Kirana UI Primitives, Ark UI, Bits UI, UI SDK     |
  | Solid     | Kirana UI Primitives, Ark UI, UI SDK              |
  | Angular   | Kirana UI Primitives, ng-primitives               |

  A component's page says which of them it is on.

- **Checked as it is written.** A misspelled property or value is a compiler
  diagnostic that names the fix, and a part's states are typed keys, so one it
  never writes is a type error. That holds for you and for an agent alike.
- **Two ways to install.** Kirana's own `kirana-style ui`, which installs into
  every framework, and shadcn/ui's CLI, from an export of the same registry.

[Installation](/docs/installation) sets a project up;
[the design system](/docs/design-system/styles) describes each axis you can
choose; [Kirana](/docs/kirana/how-styles-are-built) explains how the styles are
written.

## For language models

The documentation is also plain markdown, for an assistant or an agent to read:

- [`/llms.txt`](/llms.txt), every page with its description;
- [`/llms-full.txt`](/llms-full.txt), every page in full, in reading order;
- each page's markdown at its address with `.md` added, as
  [`/docs/components/vue/ark/button.md`](/docs/components/vue/ark/button.md), a
  component's for one framework and base; **Copy page** above each page copies it.

A component's markdown links to its registry document (`/r/<item>.json`), which
holds every file installing it writes.
