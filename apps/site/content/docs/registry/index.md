---
title: The registry
description: What kirana/ui's registry serves, in Kirana's format and in shadcn/ui's.
section: registry
order: 1
keywords: [registry, json, items, index, flattened, export]
---

# The registry

The registry is static JSON on this site, under `/r`, in two formats.

## Kirana's

`kirana-style ui` reads it:

```text
/r/index.json       every item: its name, type, version and bases
/r/<item>.json      one item, for every framework and base
```

An item carries its style modules as written, one source for every framework, and
its markup per framework and base, each with the packages and items only it needs.
It also carries its style modules flattened for every style and base, which
installation takes for your design. Every file carries a SHA-256 hash of its
content, which the lockfile records.

The `kirana` item is the design system itself: its tokens and axes, its reset, and
how `init` wires it in. It also says what `kirana-style ui preset` reads: each axis
with the attribute it sets on `<html>` and its values, and how a preset code holds
them.

Look at an item before you install it:

<!-- ::install exec="kirana-style ui view button" -->

## shadcn/ui's

For shadcn/ui's CLI, the same items under `/r/shadcn/`, once for every React
combination and style, each module flattened ([shadcn/ui's CLI](/docs/shadcn)).

## How it is checked

Every build of the registry flattens each module for every style and base and has
Kirana prove the flattened module renders what the module as written does for that
design, property by property. Each item is checked against Kirana's schema, and the
export against shadcn/ui's.
