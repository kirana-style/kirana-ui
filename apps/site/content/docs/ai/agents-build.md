---
title: Agents build with it
description: The reference, a skill and the checks ship in the package you installed, for the version you installed.
section: ai
order: 2
keywords: [llms.txt, skill, agent, coding agent, reference, authoring, testing]
---

# Agents build with it

What a coding agent needs is inside the package you installed, so it matches the version in your
lockfile. Nothing has to be fetched.

| What                  | Where, for React (the other packages hold the same)                  |
| --------------------- | -------------------------------------------------------------------- |
| The reference         | `node_modules/@kirana-ui/react/llms.txt`                             |
| A skill               | `node_modules/@kirana-ui/react/skills/kirana-ui-primitives/SKILL.md` |
| The checks            | `@kirana-ui/react/testing`                                           |
| The bridge for agents | `@kirana-ui/react/agent`                                             |

## The reference

Every adapter's package has an `llms.txt` at its root: React, Vue, Svelte, Solid, Angular and
`@kirana-ui/web`. In order, it holds:

| Section             | What it says                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Install and entries | Every path the package can be imported from. A path that is not listed is not an entry                                                            |
| Positioner options  | What every popup's positioner takes: `side`, `align`, the offsets, `anchor`                                                                       |
| Types               | Each type a prop names, written out                                                                                                               |
| Also exported       | What the entries export beside the components                                                                                                     |
| Agent, Testing      | The two entries above, in full                                                                                                                    |
| Using it            | How this framework writes a part, a prop, a change and a composition                                                                              |
| Components          | For each: its import, its parts as they nest, the root's props, every part's element and own props, and every part's attributes and CSS variables |

It is generated from the library's source, and the library's release fails when it disagrees with
it: a prop with no explanation, an import that does not resolve, a type it names and does not
explain, an export it leaves out, or a part whose props differ between two frameworks. The
component pages on this site are generated from the same files.

## A skill your agent can follow

Each adapter holds a skill, `skills/kirana-ui-primitives/SKILL.md`: when to use the library, how
a component is put together, how to style it, and the mistakes to avoid. Point your agent at it,
or copy it into the place your agent reads skills from.

```text
node_modules/@kirana-ui/react/skills/kirana-ui-primitives/SKILL.md
```

## Check the result

The package's `testing` entry reads a page for the faults every component here is held out of,
and waits for motion to end: a dangling `aria-controls`, one id on two elements, a state written
as `"false"`. An agent can run it after a change. See [Testing](/docs/primitives/testing).

## Build the component no library ships

When a design needs a component that is not here, it can be built on the behaviours the library's
own components use: presence, popups, placement, lists, roving focus, typeahead and forms, from
`@kirana-ui/core/authoring`. See [Building your own](/docs/primitives/authoring).

## The styling contract as data

`@kirana-ui/vocabulary` is every part's states and CSS variables as JSON and as typed keys, with
where each part goes inside its component. It is its own package: install it beside the adapter.
It holds no props; those are in `llms.txt` and in the package's types. See
[Styling](/docs/primitives/styling).
