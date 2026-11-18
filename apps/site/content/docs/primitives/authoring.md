---
title: Building your own
description: What the components are built from is public, so a component of your own is built the same way and behaves the same on every framework.
section: primitives
order: 9
keywords:
  [authoring, controller, parts, signals, runtime, custom component, behaviours]
---

# Building your own

Every component here is made the same way: a controller in plain TypeScript that holds the
behaviour, and a few lines per framework that draw its parts. The building blocks are public.

| Entry                         | What it holds                                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `@kirana-ui/core`             | The signals, `bindable`, `details`, `flag`, `mergeProps`, `bind`                                                  |
| `@kirana-ui/core/authoring`   | The behaviours: presence, popups, placement, lists, roving focus, typeahead, forms, geometry, direction           |
| `@kirana-ui/react/runtime`    | What a part's component is made with; `vue`, `svelte` and `solid` have the same entry, Angular's is its one       |
| `@kirana-ui/web/runtime`      | `defineElement`, for a custom element of your own                                                                 |
| `@kirana-ui/react/use-render` | `useRender` and `mergeProps`, for an element of your own that takes `render`; Vue's is `@kirana-ui/vue/primitive` |
| `@kirana-ui/core/testing`     | The checks, also `@kirana-ui/react/testing` and each adapter's: see [Testing](/docs/primitives/testing)           |

## The shape of a controller

```ts
createX(props: ReadonlySignal<XProps>, around?) => { ...signals, ...parts, mount() }
```

- **`props` is a signal.** The adapter keeps it up to date; the controller reads it with `.get()`
  where a change should be followed and `.peek()` where it should not.
- **`around` is what the component is inside**, when it is inside something: what its adapter
  found in context, each optional (`{ field }` for a control in a Field, `{ direction }` under a
  direction provider, `{ parent }` for a submenu). It is given once, when the controller is made.
  A controller that is inside nothing takes no second argument.
- **A part is `{ props, attach }`.** `props` is a signal of what goes on its element: attributes
  by their HTML names, handlers by camel-cased event names. A boolean state is `""` or absent,
  written with `flag()`. `attach(element)` does the DOM work and returns its undo.
- **Nothing touches the DOM when the controller is made**, so a server makes one and reads its
  parts.
- **A value is a `bindable`**: the caller's when they give `value`, the component's own when they
  do not. Its `set(value, details)` calls the change callback, which may `details.cancel()`.
- **A change says why**: `details(reason, event)` carries the reason, the event and its source.

The guide in the repository builds a rating end to end, on every framework, and its example is a
test: [docs/authoring.md](https://github.com/kirana-style/primitives/blob/main/docs/authoring.md).
