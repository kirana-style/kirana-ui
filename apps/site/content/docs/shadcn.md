---
title: shadcn/ui's CLI
description: kirana/ui's registry also serves an export for shadcn/ui's own CLI, for the React components on Base UI and React Aria.
section: start
order: 4
keywords: [shadcn, shadcn add, components.json, export, registry]
---

# shadcn/ui's CLI

The same registry is also written in shadcn/ui's format, for its CLI. Each item is
there once for every React combination: Base UI or React Aria, in each of the eight
styles, its style modules flattened for that style.

```text
/r/shadcn/<base>-<style>/<item>.json      react-base-nova, react-aria-lyra …
/r/shadcn/<base>-<style>/registry.json
/r/shadcn/index.json
```

A project names the export as a registry in its `components.json`, the
combination as its `style`:

```json
{
  "style": "react-base-nova",
  "iconLibrary": "lucide",
  "registries": {
    "@kirana": "https://ui.kirana-style.workers.dev/r/shadcn/{style}/{name}.json"
  }
}
```

(`ui.kirana.style` once it is attached), and adds items by namespace:

<!-- ::install run="shadcn add @kirana/button @kirana/dialog" -->

The CLI replaces each icon with your library's, as it does for shadcn/ui's own
components.

## Before it works on its own

shadcn/ui's CLI copies files; it does not set Kirana up. The project needs Kirana's
compiler, its stylesheet, the design system's reset and its styles on `<html>`,
which `kirana-style ui init` writes for you. The export's own setup, an `init`
route for shadcn/ui's CLI, comes with the site's launch. Until then, set the
project up with [`kirana-style ui init`](/docs/installation), which installs the
same components.
