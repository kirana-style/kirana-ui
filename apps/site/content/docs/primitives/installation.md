---
title: Installation
description: Install the package for your framework, write a first component and style it.
section: primitives
order: 2
keywords: [install, quick start, npm, collapsible, getting started]
---

# Installation

Install the package for your framework. It brings the core with it.

<!-- ::start:tabs -->

### React

```bash
npm install @kirana-ui/react
```

### Vue

```bash
npm install @kirana-ui/vue
```

### Svelte

```bash
npm install @kirana-ui/svelte
```

### Solid

```bash
npm install @kirana-ui/solid
```

### Angular

```bash
npm install @kirana-ui/angular
```

### Custom elements

```bash
npm install @kirana-ui/web
```

<!-- ::end:tabs -->

## A first component

Each component is its own entry, so a page carries only what it draws. A collapsible in React:

```tsx
import { Collapsible } from "@kirana-ui/react/collapsible"

export function Details() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger className="trigger">Details</Collapsible.Trigger>
      <Collapsible.Panel className="panel">
        <p>Panel content</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
```

The same component on the other frameworks is in [Frameworks](/docs/primitives/frameworks).

## Style it

Nothing is styled for you and no stylesheet is injected. A part is its element: give it a class
and style the states it writes as attributes.

```css
.trigger[data-panel-open] {
  font-weight: 600;
}

.panel {
  overflow: hidden;
  height: var(--collapsible-panel-height);
  transition: height 200ms ease;
}

/* What it animates in from, and out to. */
.panel[data-starting-style],
.panel[data-ending-style] {
  height: 0;
}
```

Which attributes and variables a part writes is on its page, under
[Components](/docs/primitives/components). [Styling](/docs/primitives/styling) says how they work
in general.

## For your editor and your agent

Every adapter's package holds its own reference as `llms.txt`, for the version you installed, and
`@kirana-ui/core` holds a skill an agent can follow. See [AI](/docs/ai/agents-build).
