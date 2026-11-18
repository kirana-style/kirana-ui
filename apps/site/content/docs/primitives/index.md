---
title: Primitives
description: Headless components that are the same on every framework, and ready for agents.
section: primitives
order: 1
keywords:
  [
    primitives,
    headless,
    unstyled,
    accessible,
    react,
    vue,
    svelte,
    solid,
    angular,
    custom elements,
  ]
---

# Kirana UI Primitives

Headless components that are the same on every framework, and ready for agents. One core, six
ways to use it: React, Vue, Svelte, Solid, Angular, and plain custom elements.

A primitive holds a component's behaviour, its keyboard and its accessibility, and draws no
styles. You write the elements' look, in plain CSS, Tailwind or Kirana.

## What is different

- **The same on every framework, proven.** One set of scenarios runs on every adapter in a real
  browser, and the DOM of every state is compared across them, in Chromium, Firefox and WebKit.
- **Angular is first class.** The same components, parts and tests as the other frameworks, as
  directives on your own elements.
- **The styling contract is data.** Every state and CSS variable a part writes is published as
  data and as typed keys (`@kirana-ui/vocabulary`), so a design system can be checked by a
  compiler and not by reading docs.

## The packages

| Package                 | What it is                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| `@kirana-ui/react`      | The components for React 18 and 19                                                        |
| `@kirana-ui/vue`        | For Vue                                                                                   |
| `@kirana-ui/svelte`     | For Svelte 5                                                                              |
| `@kirana-ui/solid`      | For Solid                                                                                 |
| `@kirana-ui/angular`    | For Angular 20 and later                                                                  |
| `@kirana-ui/web`        | As custom elements, for a page with no framework                                          |
| `@kirana-ui/core`       | The framework-free core every adapter draws: behaviour, the agent bridge, the testing kit |
| `@kirana-ui/vocabulary` | Every part's states and CSS variables, as data and typed keys                             |

All of them share one version. Each adapter brings the core with it, and what the core gives an
application is an entry of the adapter too (`@kirana-ui/react/agent`, `@kirana-ui/react/testing`),
so installing one is enough. `@kirana-ui/vocabulary` is installed on its own, by a design system
that wants the states as data.

## Where to go

- [Get started](/docs/primitives/installation): from nothing to a first component, styled, in five steps.
- [Frameworks](/docs/primitives/frameworks): how each framework writes a part, a prop and a change.
- [Styling](/docs/primitives/styling) and [Animation](/docs/primitives/animation): the attributes and variables a part gives you.
- [Components](/docs/primitives/components): all of them, with their reference.
- [Coming from Base UI](/docs/primitives/from-base-ui): what is the same, what is named
  differently, and what is not here.
- [AI](/docs/ai): what an agent gets from the packages, and the bridge that lets one use your page.

The source is [kirana-style/primitives](https://github.com/kirana-style/primitives) on GitHub.
The [components](/docs/components) on the rest of this site are drawn on several headless
libraries, and on React these primitives are one of them (Kirana UI, in a component page's
framework menu).
