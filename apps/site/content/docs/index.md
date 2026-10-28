---
title: Introduction
description: shadcn/ui's components, blocks and styles, rebuilt on Kirana's compiled styles and installed into your own project.
section: start
order: 1
keywords: [kirana ui, shadcn, components, registry, design system]
---

# Introduction

kirana/ui is [shadcn/ui](https://ui.shadcn.com) rebuilt on
[Kirana](https://github.com/kirana-style/kirana): the same components, blocks and
styles, written as typed styles that Kirana compiles into one plain stylesheet.
There is no Tailwind and no class names to merge.

As with shadcn/ui, you do not install a component library. You copy each
component's source into your project, and from then on it is yours to change.

<!-- ::preview item="button-demo" -->

## What you get

- **Every style.** Vega, Nova, Maia, Lyra, Mira, Luma, Rhea and Sera, each the
  same design as on shadcn/ui's site.
- **Every design axis.** Base colour, theme, chart colours, fonts, radius, the
  icon library and menus, chosen once and carried in a short preset code.
- **More than React.** Components on Base UI and React Aria for React, and on
  Ark UI for Vue, from one style module per component.
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
