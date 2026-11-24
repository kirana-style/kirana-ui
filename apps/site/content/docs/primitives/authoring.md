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

| Entry                         | What it holds                                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `@kirana-ui/core`             | The signals, `bindable`, `details`, `flag`, `mergeProps`, `bind`                                               |
| `@kirana-ui/core/authoring`   | The behaviours: presence, popups, placement, lists, roving focus, typeahead, forms, geometry, direction        |
| `@kirana-ui/react/runtime`    | What a part's component is made with; `vue`, `svelte` and `solid` have the same entry, Angular's is its one    |
| `@kirana-ui/web/runtime`      | `defineElement`, for a custom element of your own                                                              |
| `@kirana-ui/react/use-render` | `useRender` and `mergeProps`, for an element of your own that takes `render`                                   |
| `@kirana-ui/vue/primitive`    | `Primitive`, the same for Vue; `@kirana-ui/solid/primitive` and `@kirana-ui/svelte/primitive` add `mergeProps` |
| `@kirana-ui/core/testing`     | The checks, also `@kirana-ui/react/testing` and each adapter's: see [Testing](/docs/primitives/testing)        |

## A design system on the primitives

A design system wraps the parts in components of its own and adds elements that are no part of
any primitive (a badge, a breadcrumb's link). Each framework has one thing for it:

| Framework | An element of your own, composed as a part is            |
| --------- | -------------------------------------------------------- |
| React     | `useRender({ render, defaultTagName, props, state })`    |
| Vue       | `<Primitive as="span">`, or `as-child`                   |
| Svelte    | `<Primitive as="span">` with a `child` snippet           |
| Solid     | `<Primitive as="span" render={…}>`                       |
| Angular   | A directive of your own: its bindings join the element's |

Each comes from the entry in the table above; Angular needs nothing of the library's for it.

A default for a part you wrap (tooltips that open at once, say) is passed before the caller's
props, so the caller's still wins:

```tsx
function MyTooltip(props: ComponentProps<typeof Tooltip.Root>) {
  return <Tooltip.Root delay={0} {...props} />
}
```

Vue, Svelte and Solid do the same with their own spread. Angular cannot, since a host directive's
inputs are bound only from the element: there the hosting directive gives them with
`hostInputs`, each a function read like a signal.

```ts
hostInputs(KpTooltip, { delay: () => 0 })
```

The merge is the parts' own: classes are joined, styles merged, every handler runs, and `state`
is written as `data-*` attributes. Solid's `mergeProps` is not solid-js's of the same name:
import one under another name where a file uses both.

On Angular a design system's directive hosts the primitive's with `hostDirectives`, and the
primitives are prefixed `kp` so that your own selectors (`kui…`, `ui…`) never meet theirs.
[Frameworks](/docs/primitives/frameworks) has the lines for each, under "Know how … writes
things".

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

[Build a component](/docs/primitives/build-a-component) walks through one from an empty folder: a
reactions bar, with its state, its arrow keys, its names and three ways to style it.

The guide in the repository builds a rating end to end, on every framework, and its example is a
test: [docs/authoring.md](https://github.com/kirana-style/primitives/blob/main/docs/authoring.md).
