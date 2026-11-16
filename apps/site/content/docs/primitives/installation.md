---
title: Get started
description: From an empty project to a working, styled component in five steps, with nothing assumed.
section: primitives
order: 2
keywords:
  [
    install,
    quick start,
    get started,
    npm,
    pnpm,
    bun,
    collapsible,
    first component,
    tutorial,
  ]
---

# Get started

This page takes you from nothing to a working, styled component. It assumes you have a project
on one of the frameworks below, and nothing else: no styling library, no knowledge of headless
components.

**What a headless component is.** It is a component that does everything except look like
something. It opens and closes, moves focus, answers the keyboard and tells a screen reader what
it is. It draws plain, unstyled elements, and you decide how they look.

## 1. Install the package for your framework

Pick your framework, then your package manager. One package is all you need: it brings the
library's core with it.

<!-- ::start:tabs -->

### React

<!-- ::install packages="@kirana-ui/react" -->

### Vue

<!-- ::install packages="@kirana-ui/vue" -->

### Svelte

<!-- ::install packages="@kirana-ui/svelte" -->

### Solid

<!-- ::install packages="@kirana-ui/solid" -->

### Angular

<!-- ::install packages="@kirana-ui/angular" -->

### Custom elements

<!-- ::install packages="@kirana-ui/web" -->

<!-- ::end:tabs -->

## 2. Write your first component

We will build a section that opens and closes: a collapsible. Each component has its own import,
so your page only loads what it uses.

```tsx title="details.tsx" showLineNumbers
import { Collapsible } from "@kirana-ui/react/collapsible"

export function Details() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>Details</Collapsible.Trigger>
      <Collapsible.Panel>
        <p>Panel content</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
```

A component is made of **parts**. `Collapsible.Root` holds the state, `Collapsible.Trigger` is the
button, and `Collapsible.Panel` is what it shows and hides. Every part is one element in the page,
so you can read the markup and know what you will get.

On another framework the parts are the same and only the spelling changes. See the same component
on each in [Frameworks](/docs/primitives/frameworks).

## 3. Look at what you have

Run your app and press the button. It already works:

- the panel is in the page only while it is open;
- Enter and Space open and close it, because the trigger is a real `<button>`;
- a screen reader hears "Details, button, collapsed" and then "expanded".

It also looks like nothing: a browser's default button, and text below it. That is the point. The
library ships no CSS and adds none to your page.

## 4. Style it

A part tells you its state by writing an attribute on its element, like `data-panel-open` on the
trigger, and it hands you measurements as CSS variables, like `--collapsible-panel-height`. You
style those with whatever you already use. The same component, three ways:

<!-- ::start:tabs -->

### CSS Modules

```css title="details.module.css"
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

```tsx title="details.tsx"
import { Collapsible } from "@kirana-ui/react/collapsible"

import styles from "./details.module.css"

export function Details() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger className={styles.trigger}>
        Details
      </Collapsible.Trigger>
      <Collapsible.Panel className={styles.panel}>
        <p>Panel content</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
```

### Tailwind

```tsx title="details.tsx"
import { Collapsible } from "@kirana-ui/react/collapsible"

export function Details() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger className="data-panel-open:font-semibold">
        Details
      </Collapsible.Trigger>
      <Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-starting-style:h-0 data-ending-style:h-0">
        <p>Panel content</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
```

### Kirana

```tsx title="details.tsx"
import { css, props } from "@kirana-style/core"
import { Collapsible } from "@kirana-ui/react/collapsible"

const styles = {
  trigger: css({
    fontWeight: { base: "400", "[data-panel-open]": "600" },
  }),
  panel: css({
    overflow: "hidden",
    height: {
      base: "var(--collapsible-panel-height)",
      "[data-starting-style]": "0",
      "[data-ending-style]": "0",
    },
    transitionProperty: "height",
    transitionDuration: "200ms",
  }),
}

export function Details() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger {...props(styles.trigger)}>
        Details
      </Collapsible.Trigger>
      <Collapsible.Panel {...props(styles.panel)}>
        <p>Panel content</p>
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}
```

<!-- ::end:tabs -->

Three things to notice, because every component works this way:

- `[data-panel-open]` is there while the panel is open and gone while it is closed. A state is
  never written as `="false"`.
- `[data-starting-style]` is on the panel for the first frame of opening, and
  `[data-ending-style]` while it closes. Put the hidden look under both, add a transition, and it
  animates. The panel leaves the page when the transition ends.
- `--collapsible-panel-height` is the panel's real height, which CSS cannot know by itself.

## 5. Find the next component

Every component has a page with its example on each framework, a picture of how its parts nest,
and a table of every prop, attribute and CSS variable.

- [All components](/docs/primitives/components)
- [Styling](/docs/primitives/styling): the rules above, in full.
- [Animation](/docs/primitives/animation): entrances and exits.
- [Forms](/docs/primitives/forms): names, labels, errors and validation.

## For your editor and your agent

Every package holds its own reference as `llms.txt`, for the version you installed, and
`@kirana-ui/core` holds a skill an agent can follow. See [AI](/docs/ai/agents-build).
