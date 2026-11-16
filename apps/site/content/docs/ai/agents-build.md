---
title: Agents build with it
description: The reference, a skill, the building blocks and the checks ship in the packages, for the version you installed.
section: ai
order: 2
keywords: [llms.txt, skill, agent, coding agent, reference, authoring, testing]
---

# Agents build with it

A coding agent writes better code from the library's own words than from what it remembers. So
what it needs is in the packages, and matches the version in your lockfile.

## The reference ships with the version you installed

Every adapter's package has an `llms.txt` at its root:

```text
node_modules/@kirana-ui/react/llms.txt
node_modules/@kirana-ui/vue/llms.txt
node_modules/@kirana-ui/svelte/llms.txt
node_modules/@kirana-ui/solid/llms.txt
node_modules/@kirana-ui/angular/llms.txt
```

It says how that framework writes a part, a prop and a change, then lists every component: its
import, its parts, its props, and the attributes and CSS variables of each part. It is generated
from the library's own definitions and checked on every release, so it cannot drift from what the
components do. The component pages on this site are generated from the same files.

## A skill your agent can follow

`@kirana-ui/core` holds a skill, `skills/kirana-ui-primitives/SKILL.md`: when to use the library,
how a component is put together, how to style it, and the mistakes to avoid. Point your agent at
it, or copy it into the place your agent reads skills from.

```text
node_modules/@kirana-ui/core/skills/kirana-ui-primitives/SKILL.md
```

## Build the component no library ships

When a design needs a component that is not here, an agent can build it on the same tested
behaviours the library's own components use: presence, popups, placement, lists, roving focus,
typeahead and forms, from `@kirana-ui/core/authoring`. See
[Building your own](/docs/primitives/authoring).

## Check the result the way we check ours

`@kirana-ui/core/testing` reads a page for the faults every component here is held out of, and
waits for motion to end. An agent that runs it after a change finds a dangling `aria-controls` or
a state written as `"false"` before you do. See [Testing](/docs/primitives/testing).

## The contract as data

`@kirana-ui/vocabulary` is every part's states and variables as JSON and as typed keys: what a
model can be given to style a component without reading prose. See
[Styling](/docs/primitives/styling).
