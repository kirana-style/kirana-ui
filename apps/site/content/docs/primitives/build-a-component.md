---
title: Build a component
description: A reactions bar of your own on the primitives' authoring entry, from an empty file to a styled, tested component on React and Vue.
section: primitives
order: 9.5
keywords:
  [
    authoring,
    build a component,
    tutorial,
    controller,
    defineComponent,
    roving focus,
    createTabStop,
    bindable,
    reactions,
    custom component,
  ]
---

# Build a component

The components in this library are built from public pieces: a controller in plain TypeScript
holds the behaviour, and a few lines per framework draw its parts. This page uses the same pieces
to build a component the library does not have, one step at a time.

**What you will have at the end:** a reactions bar, a row of emoji buttons under a post.

| It does                                                  | Because of                                       |
| -------------------------------------------------------- | ------------------------------------------------ |
| One reaction is picked at a time; pressing it unpicks it | A `bindable` value, changed with `details`       |
| The whole bar is one stop for Tab                        | `createTabStop` from the authoring entry         |
| Arrow keys move between reactions, Home and End jump     | The tab stop's roving focus                      |
| Right to left, the arrows swap                           | The roving focus reads the page's `dir`          |
| Each reaction is a named toggle button, pressed or not   | `role="group"`, `aria-label` and `aria-pressed`  |
| It is styled with CSS, Tailwind CSS or Kirana            | The `data-picked` and `data-disabled` attributes |
| A test holds it to the library's own checks              | `faults` and `recorder` from the testing entry   |

The behaviour is written once, in files with no framework in them, and drawn on React and on Vue.
[Building your own](/docs/primitives/authoring) explains the pieces; this page puts them to work.

**Before you start** you need a React or Vue project built with Vite, and nothing else.

## 1. Install

Install the package for your framework, and `@kirana-ui/core` beside it, **at the same version**.
The authoring entry is `@kirana-ui/core/authoring`. Your framework's package brings the core with
it, but a strict package manager (pnpm, Bun with isolated installs) only lets your code import a
package your project names.

<!-- ::start:tabs -->

### React

<!-- ::install packages="@kirana-ui/react @kirana-ui/core" -->

### Vue

<!-- ::install packages="@kirana-ui/vue @kirana-ui/core" -->

<!-- ::end:tabs -->

Your project builds and looks as it did. Nothing is added to the page until you draw a part.

## 2. Define the parts

A component is a set of parts, each one element in the page. The reactions bar has two: the
`root`, the row, and a `reaction`, one button in it, repeated. `defineComponent` writes them down
with the states each one marks on its element, as the library's own vocabulary does:

```ts title="src/reactions/reactions.vocabulary.ts"
import { DISABLED, defineComponent, state } from "@kirana-ui/core/authoring"

/** The reactions bar's parts, and the states each one writes on its element. */
export const reactions = defineComponent({
  root: {
    description:
      "The row of reactions. One stop for Tab; the arrow keys move inside it.",
    states: { disabled: DISABLED },
  },
  reaction: {
    description:
      "One reaction: a button that picks it, or unpicks it when it is picked.",
    inside: "root",
    repeated: true,
    states: {
      picked: state("data-picked", "Present while it is the reaction picked."),
      disabled: DISABLED,
    },
  },
})
```

The definition is data. It draws nothing and gives the controller nothing: it is what your styles
and your tests read. `state(attribute, description)` is a state its attribute marks by being
present, and `DISABLED` is the library's own `data-disabled`.

Then the props each part takes of its own, beside its element's attributes:

```ts title="src/reactions/reactions.types.ts"
import type { ChangeDetails } from "@kirana-ui/core"

/** What `Reactions.Root` takes of its own. */
export interface ReactionsProps {
  /** The reaction picked, or `null` for none. Given, the caller holds it. */
  value?: string | null | undefined
  /** The reaction picked at first, when the caller does not hold it. */
  defaultValue?: string | null | undefined
  /** Asked for every change: `details` says why, and may cancel it. */
  onValueChange?:
    | ((value: string | null, details: ChangeDetails) => void)
    | undefined
  disabled?: boolean | undefined
  /** Whether the arrows wrap from the last reaction to the first. Default `true`. */
  loopFocus?: boolean | undefined
}

/** What `Reactions.Reaction` takes of its own. */
export interface ReactionProps {
  /** The bar's value while this reaction is picked. */
  value: string
  /** Its name for assistive technology: "Thumbs up", not "👍". */
  label: string
  disabled?: boolean | undefined
}
```

`value`, `defaultValue` and `onValueChange` are the pair every component here takes: given a
`value` the caller holds it, given none the component holds its own.

You still see nothing new: these two files are types and data.

## 3. Render them

A controller is a function of its props, as a signal, that returns its parts. A part is
`{ props, attach }`: `props` is a signal of the attributes and handlers for its element, and
`attach(element)` does any work on the element once it is in the page and returns its undo. Start
with parts that only draw a button:

```ts title="src/reactions/reactions.ts"
import { computed, type ReadonlySignal } from "@kirana-ui/core"

import type { ReactionProps, ReactionsProps } from "./reactions.types"

const NOTHING = () => {}

export function createReactions(props: ReadonlySignal<ReactionsProps>) {
  return {
    mount: () => NOTHING,
    root: {
      props: computed(() => ({})),
      attach: () => NOTHING,
    },
  }
}

export type Reactions = ReturnType<typeof createReactions>

export function createReaction(
  props: ReadonlySignal<ReactionProps>,
  bar: Reactions
) {
  return {
    mount: () => NOTHING,
    root: {
      props: computed(() => ({ type: "button" })),
      attach: () => NOTHING,
    },
  }
}
```

A reaction's controller takes its bar as a second argument: that is how it will read the value
and join the bar's tab stop. Nothing here touches the DOM, so a server can make both controllers
and read their parts.

Now the framework's side, which this page does not change again. Each part is a component: it
makes its controller once, follows its props, and draws its part's element.

<!-- ::start:tabs -->

### React

```tsx title="src/reactions/index.tsx"
import { createContext, useContext } from "react"
import { within, type StateOf } from "@kirana-ui/core"
import {
  component,
  parts,
  useController,
  usePart,
  type PartComponentProps,
} from "@kirana-ui/react/runtime"

import {
  createReaction,
  createReactions,
  type Reactions as Bar,
} from "./reactions"
import type { ReactionProps, ReactionsProps } from "./reactions.types"
import { reactions } from "./reactions.vocabulary"

const BarContext = createContext<Bar | null>(null)

type RootProps = PartComponentProps<
  "div",
  StateOf<typeof reactions.root>,
  ReactionsProps
>
type ReactionPartProps = PartComponentProps<
  "button",
  StateOf<typeof reactions.reaction>,
  ReactionProps
>

function Root({
  value,
  defaultValue,
  onValueChange,
  disabled,
  loopFocus,
  ...rest
}: RootProps) {
  const bar = useController(createReactions, {
    value,
    defaultValue,
    onValueChange,
    disabled,
    loopFocus,
  })
  return (
    <BarContext.Provider value={bar}>
      {usePart(bar.root, "div", rest)}
    </BarContext.Provider>
  )
}

function Reaction({ value, label, disabled, ...rest }: ReactionPartProps) {
  const bar = useContext(BarContext)
  if (!bar)
    throw new Error("<Reactions.Reaction> must be inside <Reactions.Root>")
  // `within` hands the controller its bar. In a constant of its own:
  // written inside the call below, its types are not inferred.
  const create = within(createReaction, bar)
  const reaction = useController(create, { value, label, disabled })
  return usePart(reaction.root, "button", rest)
}

export const Reactions = parts("Reactions", {
  Root: component("Reactions.Root", Root),
  Reaction: component("Reactions.Reaction", Reaction),
})
```

| From `@kirana-ui/react/runtime` | What it does here                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `useController(create, props)`  | Makes the controller once and hands it each render's props, after the render commits |
| `usePart(part, tag, props)`     | Draws the part's element with your props under the part's, and attaches it           |
| `PartComponentProps`            | The element's props, `render`, `ref`, and your own props in place of any same name   |
| `component`, `parts`            | Named components that take a `ref` on React 18 and 19, grouped as `Reactions.*`      |

`StateOf` turns a part's definition into the state a `render` function is given:
`{ picked?: true, disabled?: true }` for a reaction.

```tsx title="src/reactions-bar.tsx"
import { useState } from "react"

import { Reactions } from "./reactions"

export const REACTIONS = [
  { value: "thumbs-up", emoji: "👍", label: "Thumbs up" },
  { value: "heart", emoji: "❤️", label: "Heart" },
  { value: "laugh", emoji: "😂", label: "Laugh" },
  { value: "surprised", emoji: "😮", label: "Surprised" },
  { value: "party", emoji: "🎉", label: "Party" },
]

export function ReactionsBar() {
  const [picked, setPicked] = useState<string | null>(null)
  const label = REACTIONS.find((each) => each.value === picked)?.label

  return (
    <div>
      <Reactions.Root
        aria-label="React to this post"
        value={picked}
        onValueChange={(value) => setPicked(value)}
      >
        {REACTIONS.map((each) => (
          <Reactions.Reaction
            key={each.value}
            value={each.value}
            label={each.label}
          >
            {each.emoji}
          </Reactions.Reaction>
        ))}
      </Reactions.Root>
      <p>{label ? `You reacted: ${label}` : "No reaction yet"}</p>
    </div>
  )
}
```

### Vue

```ts title="src/reactions/index.ts"
import { defineComponent, h, type PropType } from "vue"
import { within, type ChangeDetails } from "@kirana-ui/core"
import {
  context,
  controller,
  optional,
  partComponent,
} from "@kirana-ui/vue/runtime"

import {
  createReaction,
  createReactions,
  type Reactions as Controller,
} from "./reactions"

const bar = context<Controller>("Reactions")

/** `v-model:value`, or `value` with `@value-change="(value, details) => …"`. */
const Root = defineComponent({
  name: "ReactionsRoot",
  inheritAttrs: false,
  props: {
    value: optional(String as PropType<string | null>),
    defaultValue: optional(String as PropType<string | null>),
    disabled: Boolean,
    loopFocus: optional(Boolean),
  },
  emits: {
    "update:value": (_value: string | null) => true,
    valueChange: (_value: string | null, _details: ChangeDetails) => true,
  },
  setup(props, { attrs, slots, emit }) {
    const made = bar.provide(
      controller(createReactions, () => ({
        value: props.value,
        defaultValue: props.defaultValue,
        disabled: props.disabled,
        loopFocus: props.loopFocus,
        onValueChange(value: string | null, details: ChangeDetails) {
          emit("valueChange", value, details)
          if (!details.canceled) emit("update:value", value)
        },
      }))
    )
    const Element = partComponent(
      "ReactionsRootElement",
      "div",
      () => made.root
    )
    return () => h(Element, attrs, slots)
  },
})

const Reaction = defineComponent({
  name: "ReactionsReaction",
  inheritAttrs: false,
  props: {
    value: { type: String, required: true },
    label: { type: String, required: true },
    disabled: Boolean,
  },
  setup(props, { attrs, slots }) {
    const made = controller(within(createReaction, bar.use()), () => ({
      value: props.value,
      label: props.label,
      disabled: props.disabled,
    }))
    const Element = partComponent(
      "ReactionsReactionElement",
      "button",
      () => made.root
    )
    return () => h(Element, attrs, slots)
  },
})

export const Reactions = { Root, Reaction }
```

| From `@kirana-ui/vue/runtime`       | What it does here                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| `controller(create, read)`          | Makes the controller once, follows the props `read` returns, and mounts it      |
| `context(name)`                     | `provide` in the root, `use` in a reaction, which throws outside a root         |
| `partComponent(name, tag, resolve)` | Draws the part's element with your attributes under the part's, and attaches it |
| `optional(type)`                    | A prop that is "not given" when absent, where Vue would make a boolean `false`  |

`optional(Boolean)` matters for `loopFocus`: Vue makes an absent `Boolean` prop `false`, which would
turn the wrapping off rather than leave the default.

```vue title="src/ReactionsBar.vue"
<script setup lang="ts">
import { computed, ref } from "vue"

import { Reactions } from "./reactions"

const REACTIONS = [
  { value: "thumbs-up", emoji: "👍", label: "Thumbs up" },
  { value: "heart", emoji: "❤️", label: "Heart" },
  { value: "laugh", emoji: "😂", label: "Laugh" },
  { value: "surprised", emoji: "😮", label: "Surprised" },
  { value: "party", emoji: "🎉", label: "Party" },
]

const picked = ref<string | null>(null)
const label = computed(
  () => REACTIONS.find((each) => each.value === picked.value)?.label
)
</script>

<template>
  <div>
    <Reactions.Root v-model:value="picked" aria-label="React to this post">
      <Reactions.Reaction
        v-for="each in REACTIONS"
        :key="each.value"
        :value="each.value"
        :label="each.label"
      >
        {{ each.emoji }}
      </Reactions.Reaction>
    </Reactions.Root>
    <p>{{ label ? `You reacted: ${label}` : "No reaction yet" }}</p>
  </div>
</template>
```

<!-- ::end:tabs -->

Put `ReactionsBar` on a page and run the app. **You should see** five emoji in browser buttons,
in a row, and "No reaction yet" under them. Pressing one does nothing yet: the parts have no
state.

## 4. Add state

The bar holds the value; each reaction reads it and asks to change it. In `createReactions`, make
the value a `bindable`, the caller's while they give one and the bar's own otherwise:

```ts title="src/reactions/reactions.ts"
import {
  bindable,
  computed,
  details,
  flag,
  type ReadonlySignal,
} from "@kirana-ui/core"

export function createReactions(props: ReadonlySignal<ReactionsProps>) {
  const value = bindable<string | null>({
    value: () => props.get().value,
    defaultValue: props.peek().defaultValue ?? null,
    onChange: (next, why) => props.peek().onValueChange?.(next, why),
  })
  const disabled = computed(() => Boolean(props.get().disabled))

  return {
    value,
    disabled,
    mount: () => NOTHING,
    root: {
      props: computed(() => ({
        "data-disabled": flag(disabled.get()),
      })),
      attach: () => NOTHING,
    },
  }
}
```

In `createReaction`, work out whether this reaction is the one picked, write it as
`data-picked`, and on a press ask the bar for the new value, or for `null` when it is already
picked:

```ts title="src/reactions/reactions.ts"
export function createReaction(
  props: ReadonlySignal<ReactionProps>,
  bar: Reactions
) {
  const picked = computed(() => bar.value.get() === props.get().value)
  const disabled = computed(
    () => Boolean(props.get().disabled) || bar.disabled.get()
  )

  return {
    picked,
    mount: () => NOTHING,
    root: {
      props: computed(() => ({
        type: "button",
        disabled: flag(disabled.get()),
        "data-picked": flag(picked.get()),
        "data-disabled": flag(disabled.get()),
        onClick(event: MouseEvent) {
          if (disabled.peek()) return
          const next = picked.peek() ? null : props.peek().value
          bar.value.set(next, details("press", event))
        },
      })),
      attach: () => NOTHING,
    },
  }
}
```

| Piece                    | What it is                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `props.get()`            | Reads a prop and follows it: the `computed` runs again when it changes                        |
| `props.peek()`           | Reads a prop once, in a handler, without following it                                         |
| `flag(on)`               | A boolean state as an attribute: `""` when on, absent when off, never `"false"`               |
| `details(reason, event)` | What the change callback is given: the reason, the event, its source, and `cancel()`          |
| `bindable.set(value, d)` | Asks for the value: `onValueChange` hears it, and the value moves unless the callback cancels |

**You should see** a reaction stay picked when you press it: its button carries `data-picked` and
the line reads "You reacted: Heart". Pressing another moves the pick; pressing the picked one
again unpicks it, and the line says "No reaction yet". Tab still stops on every button, five
stops in all.

## 5. Move with the arrow keys

A row of buttons like this one is one stop for Tab, and the arrow keys move inside it. The
authoring entry has that whole behaviour: `createTabStop()`. The bar makes one, and its root
moves focus on a key:

```ts title="src/reactions/reactions.ts"
import { createTabStop } from "@kirana-ui/core/authoring"

export function createReactions(props: ReadonlySignal<ReactionsProps>) {
  // … the value and `disabled`, as before
  const stop = createTabStop()

  return {
    value,
    disabled,
    stop,
    mount: () => NOTHING,
    root: {
      props: computed(() => ({
        "data-disabled": flag(disabled.get()),
        onKeyDown(event: KeyboardEvent) {
          stop.roving.move(event, {
            orientation: "horizontal",
            loop: props.peek().loopFocus ?? true,
          })
        },
      })),
      attach: () => NOTHING,
    },
  }
}
```

Each reaction joins the stop when its element is in the page, takes its `tabindex` from it, and
tells it when it has focus. This is the first part with work in `attach`. `createReaction` now
reads:

```ts title="src/reactions/reactions.ts"
import { signal } from "@kirana-ui/core"

export function createReaction(
  props: ReadonlySignal<ReactionProps>,
  bar: Reactions
) {
  const element = signal<HTMLElement | undefined>(undefined)
  const picked = computed(() => bar.value.get() === props.get().value)
  const disabled = computed(
    () => Boolean(props.get().disabled) || bar.disabled.get()
  )

  return {
    picked,
    mount: () => NOTHING,
    root: {
      props: computed(() => ({
        type: "button",
        disabled: flag(disabled.get()),
        tabindex: bar.stop.tabindex(element.get()),
        "data-picked": flag(picked.get()),
        "data-disabled": flag(disabled.get()),
        onClick(event: MouseEvent) {
          if (disabled.peek()) return
          const next = picked.peek() ? null : props.peek().value
          bar.value.set(next, details("press", event))
        },
        onFocus(event: FocusEvent) {
          bar.stop.focused(event.currentTarget as HTMLElement)
        },
      })),
      attach(target: HTMLElement) {
        element.set(target)
        const leave = bar.stop.join(target)
        return () => {
          leave()
          element.set(undefined)
        }
      },
    },
  }
}
```

| Key           | What happens                                                 |
| ------------- | ------------------------------------------------------------ |
| Tab           | Enters the bar on the reaction last focused, or leaves it    |
| Right / Left  | Next / previous reaction, wrapping at the ends (`loopFocus`) |
| Home / End    | First / last reaction                                        |
| Space / Enter | Picks or unpicks the focused reaction (it is a real button)  |

`stop.roving.move` reads the reading direction of the element it moves from: in a page or a
section with `dir="rtl"`, Right moves to the previous reaction and Left to the next. A disabled
reaction is skipped.

**You should see** one Tab stop for the whole bar: Tab lands on a reaction, the arrows walk the
row, and the next Tab leaves the bar. Come back with Shift+Tab and you land on the reaction you
left. Before anything in the bar has had focus every reaction is `tabindex="0"`, since a server
cannot know which comes first; the first one focused becomes the stop.

## 6. Make it accessible

A screen reader reads three things from a part: its role, its name and its state. Add them to the
parts' props:

- The root is `role="group"`, named by the `aria-label` you pass it ("React to this post").
- Each reaction is named by its `label` prop, as `aria-label`: an emoji's own name ("red heart")
  is not what it means here.
- Each reaction says whether it is picked with `aria-pressed`, `"true"` or `"false"`, which makes
  it a toggle button.

Why not `role="radiogroup"`: a radio cannot be unchecked by pressing it again, so a radio group
would tell the reader something the bar does not do. A group of toggle buttons is what this is.

The whole controller, as it ends:

```ts title="src/reactions/reactions.ts" showLineNumbers
import {
  bindable,
  computed,
  details,
  flag,
  signal,
  type ReadonlySignal,
} from "@kirana-ui/core"
import { createTabStop } from "@kirana-ui/core/authoring"

import type { ReactionProps, ReactionsProps } from "./reactions.types"

const NOTHING = () => {}

export function createReactions(props: ReadonlySignal<ReactionsProps>) {
  const value = bindable<string | null>({
    value: () => props.get().value,
    defaultValue: props.peek().defaultValue ?? null,
    onChange: (next, why) => props.peek().onValueChange?.(next, why),
  })
  const disabled = computed(() => Boolean(props.get().disabled))
  const stop = createTabStop()

  return {
    value,
    disabled,
    stop,
    mount: () => NOTHING,
    root: {
      props: computed(() => ({
        role: "group",
        "data-disabled": flag(disabled.get()),
        onKeyDown(event: KeyboardEvent) {
          stop.roving.move(event, {
            orientation: "horizontal",
            loop: props.peek().loopFocus ?? true,
          })
        },
      })),
      attach: () => NOTHING,
    },
  }
}

export type Reactions = ReturnType<typeof createReactions>

export function createReaction(
  props: ReadonlySignal<ReactionProps>,
  bar: Reactions
) {
  const element = signal<HTMLElement | undefined>(undefined)
  const picked = computed(() => bar.value.get() === props.get().value)
  const disabled = computed(
    () => Boolean(props.get().disabled) || bar.disabled.get()
  )

  return {
    picked,
    mount: () => NOTHING,
    root: {
      props: computed(() => ({
        type: "button",
        "aria-label": props.get().label,
        "aria-pressed": String(picked.get()),
        disabled: flag(disabled.get()),
        tabindex: bar.stop.tabindex(element.get()),
        "data-picked": flag(picked.get()),
        "data-disabled": flag(disabled.get()),
        onClick(event: MouseEvent) {
          if (disabled.peek()) return
          const next = picked.peek() ? null : props.peek().value
          bar.value.set(next, details("press", event))
        },
        onFocus(event: FocusEvent) {
          bar.stop.focused(event.currentTarget as HTMLElement)
        },
      })),
      attach(target: HTMLElement) {
        element.set(target)
        const leave = bar.stop.join(target)
        return () => {
          leave()
          element.set(undefined)
        }
      },
    },
  }
}
```

**You should see** the same bar, and a screen reader hears more of it. After picking Heart, the
browser's accessibility tree reads:

```text
- group "React to this post":
  - button "Thumbs up": 👍
  - button "Heart" [pressed]: ❤️
  - button "Laugh": 😂
  - button "Surprised": 😮
  - button "Party": 🎉
```

And the elements:

```html
<div aria-label="React to this post" role="group">
  <button
    type="button"
    aria-label="Thumbs up"
    aria-pressed="false"
    tabindex="-1"
  >
    👍
  </button>
  <button
    type="button"
    aria-label="Heart"
    aria-pressed="true"
    tabindex="0"
    data-picked=""
  >
    ❤️
  </button>
  …
</div>
```

## 7. Style it

The bar ships no CSS, like every part here. A stylesheet reads its element and its states:
`[data-picked]` on the picked reaction, `[data-disabled]` on a disabled one or on the root, and
`:focus-visible` for the focused one. The same look, three ways, on React (on Vue, `class` in
place of `className`, and Kirana's `props()` spread with `v-bind`):

<!-- ::start:tabs -->

### CSS

```css title="src/reactions.css"
.reactions {
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid #e5e5e5;
  border-radius: 999px;
}

.reaction {
  width: 2.25rem;
  height: 2.25rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
  transition: transform 120ms ease;
}

.reaction:hover {
  background: #f5f5f5;
}

.reaction:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.reaction[data-picked] {
  background: #dbeafe;
  transform: scale(1.15);
}

.reaction[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```tsx title="src/reactions-css.tsx"
import { Reactions } from "./reactions"
import { REACTIONS } from "./reactions-bar"
import "./reactions.css"

export function ReactionsCss() {
  return (
    <Reactions.Root aria-label="React to this post" className="reactions">
      {REACTIONS.map((each) => (
        <Reactions.Reaction
          key={each.value}
          value={each.value}
          label={each.label}
          className="reaction"
        >
          {each.emoji}
        </Reactions.Reaction>
      ))}
    </Reactions.Root>
  )
}
```

### Tailwind CSS

With Tailwind CSS 4 set up (`tailwindcss` and `@tailwindcss/vite`, and `@import "tailwindcss"` in
your stylesheet), a state is a data variant: `data-picked:`, `data-disabled:`.

```tsx title="src/reactions-tailwind.tsx"
import { Reactions } from "./reactions"
import { REACTIONS } from "./reactions-bar"

export function ReactionsTailwind() {
  return (
    <Reactions.Root
      aria-label="React to this post"
      className="inline-flex gap-1 rounded-full border border-neutral-200 p-1"
    >
      {REACTIONS.map((each) => (
        <Reactions.Reaction
          key={each.value}
          value={each.value}
          label={each.label}
          className="size-9 cursor-pointer rounded-full text-xl transition-transform hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-picked:scale-115 data-picked:bg-blue-100"
        >
          {each.emoji}
        </Reactions.Reaction>
      ))}
    </Reactions.Root>
  )
}
```

### Kirana

Kirana compiles `css({…})` at build time. It needs `@kirana-style/core`, the `@kirana-style/vite`
plugin before your framework's in `vite.config.ts`, a `kirana.config.ts`
(`export default defineConfig({})` from `@kirana-style/core/config`) and
`import "@kirana-style/core/stylesheet.css"` in your entry. A state is a condition on a value,
written as its attribute selector. The parts do not read `sx`: spread `props()` on them.

```tsx title="src/reactions-kirana.tsx"
import { css, props } from "@kirana-style/core"

import { Reactions } from "./reactions"
import { REACTIONS } from "./reactions-bar"

const styles = {
  root: css({
    display: "inline-flex",
    gap: "0.25rem",
    padding: "0.25rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#e5e5e5",
    borderRadius: "999px",
  }),
  reaction: css({
    width: "2.25rem",
    height: "2.25rem",
    borderWidth: "0",
    borderRadius: "999px",
    backgroundColor: {
      base: "transparent",
      ":hover": "#f5f5f5",
      "[data-picked]": "#dbeafe",
    },
    fontSize: "1.25rem",
    cursor: { base: "pointer", "[data-disabled]": "not-allowed" },
    opacity: { base: "1", "[data-disabled]": "0.5" },
    transform: { base: "none", "[data-picked]": "scale(1.15)" },
    transitionProperty: "transform",
    transitionDuration: "120ms",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: "#2563eb",
    outlineOffset: "2px",
  }),
}

export function ReactionsKirana() {
  return (
    <Reactions.Root aria-label="React to this post" {...props(styles.root)}>
      {REACTIONS.map((each) => (
        <Reactions.Reaction
          key={each.value}
          value={each.value}
          label={each.label}
          {...props(styles.reaction)}
        >
          {each.emoji}
        </Reactions.Reaction>
      ))}
    </Reactions.Root>
  )
}
```

<!-- ::end:tabs -->

**You should see** a rounded pill with five round buttons. The picked one has a pale blue disc
and grows a little; the focused one has a blue ring when you reach it with the keyboard. The three
versions look alike (Tailwind's palette is close to the hex colours, not equal to them).

## 8. Check it

The testing entry of your framework's package (`@kirana-ui/react/testing`,
`@kirana-ui/vue/testing`) holds the checks the library runs on its own components:

- `recorder()` is a change callback that writes down what it heard, as `"value reason"`.
- `faults(root, known(reactions))` reads the page for what a component must never write: a
  `data-*` attribute no vocabulary names, a state written as `="false"`, a reference to an id that
  is not in the page, one id on two elements. `known(reactions)` adds your definition from step 2
  to the library's vocabulary, so `data-picked` is known.

With Vitest, jsdom and Testing Library:

<!-- ::install dev="vitest jsdom @testing-library/react" -->

```tsx title="src/reactions.test.tsx"
// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import type { ChangeDetails } from "@kirana-ui/react"
import { faults, known, recorder } from "@kirana-ui/react/testing"
import { afterEach, expect, test } from "vitest"

import { Reactions } from "./reactions"
import { REACTIONS } from "./reactions-bar"
import { reactions } from "./reactions/reactions.vocabulary"

afterEach(cleanup)

function Bar(props: {
  onValueChange?: (value: string | null, details: ChangeDetails) => void
}) {
  return (
    <Reactions.Root
      aria-label="React to this post"
      onValueChange={props.onValueChange}
    >
      {REACTIONS.map((each) => (
        <Reactions.Reaction
          key={each.value}
          value={each.value}
          label={each.label}
        >
          {each.emoji}
        </Reactions.Reaction>
      ))}
    </Reactions.Root>
  )
}

test("picks one reaction, and unpicks it when pressed again", () => {
  const heard = recorder<string | null>()
  render(<Bar onValueChange={heard.listen} />)
  const heart = screen.getByRole("button", { name: "Heart" })

  fireEvent.click(heart)
  expect(heart.getAttribute("aria-pressed")).toBe("true")
  fireEvent.click(screen.getByRole("button", { name: "Laugh" }))
  expect(heart.getAttribute("aria-pressed")).toBe("false")
  fireEvent.click(screen.getByRole("button", { name: "Laugh" }))

  expect(heard.said()).toEqual(["heart press", "laugh press", "null press"])
})

test("is one stop for Tab, and the arrow keys move inside it", () => {
  render(<Bar />)
  const first = screen.getByRole("button", { name: "Thumbs up" })
  first.focus()
  fireEvent.keyDown(first, { key: "ArrowRight" })
  expect(document.activeElement).toBe(
    screen.getByRole("button", { name: "Heart" })
  )
  fireEvent.keyDown(document.activeElement!, { key: "End" })
  expect(document.activeElement).toBe(
    screen.getByRole("button", { name: "Party" })
  )

  const stops = screen
    .getAllByRole("button")
    .filter((each) => each.tabIndex === 0)
  expect(stops).toHaveLength(1)
})

test("writes nothing a stylesheet or a screen reader would misread", () => {
  render(<Bar />)
  fireEvent.click(screen.getByRole("button", { name: "Heart" }))
  expect(faults(document.body, known(reactions))).toEqual([])
})
```

<!-- ::install exec="vitest run" -->

**You should see** three tests pass. jsdom has no layout, so it cannot tell left to right from
right to left: check `dir="rtl"` in a browser, or in a browser test (Vitest's browser mode,
Playwright).

## What can go wrong

| What you see                                                         | Why, and what to do                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module '@kirana-ui/core/authoring'`                     | Your package manager keeps packages you did not name out of reach. Install `@kirana-ui/core`, at your framework package's version                                                                                                                                                                                                                  |
| `faults` says `button has data-picked, which no vocabulary names`    | `faults` was given `known()` alone. Pass your definition: `known(reactions)`                                                                                                                                                                                                                                                                       |
| A type error on `useController(within(createReaction, bar), …)`      | Written inside the call, `within`'s types are not inferred and the props become `object`. Put `within(…)` in a constant first, as in step 3. Vue's `controller` takes it inline                                                                                                                                                                    |
| The arrows go the wrong way under a `DirectionProvider`              | Your component reads the reading direction from the page's `dir`. To follow a provider, give the bar's controller a second argument, `around`, made with `within(createReactions, { direction: useDirectionAround() })` (`useDirectionAround` is in your framework's runtime entry), and pass `direction: around?.direction` to `stop.roving.move` |
| `<Reactions.Reaction> must be inside <Reactions.Root>`               | A reaction was drawn outside a root. Every reaction goes inside one                                                                                                                                                                                                                                                                                |
| On Vue, `loopFocus` is off though you did not set it                 | The prop was declared `Boolean`, which Vue makes `false` when absent. Declare it `optional(Boolean)`                                                                                                                                                                                                                                               |
| Kirana's styles lose to Tailwind's preflight in an app that has both | The cascade layer declared first is the weakest. Import your Tailwind stylesheet before `@kirana-style/core/stylesheet.css`                                                                                                                                                                                                                        |

## Where to go next

- [Building your own](/docs/primitives/authoring): every entry of the authoring kit, and the shape
  of a controller.
- [Styling](/docs/primitives/styling): the rules the three styles above follow.
- [Testing](/docs/primitives/testing): `serialize`, to hold your React and Vue versions to one
  DOM, and `settled`, for a component that animates.
- [Frameworks](/docs/primitives/frameworks): how Svelte, Solid and Angular write parts, to draw
  the same controller there.
