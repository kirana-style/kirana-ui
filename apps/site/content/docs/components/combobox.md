---
title: Combobox
description: Autocomplete input with a list of suggestions.
section: components
variants: [react/base, react/aria]
keywords: [combobox, autocomplete, select, search, component, base, aria]
---

# Combobox

<!-- ::preview item="combobox-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="combobox" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
```

<!-- ::start:only react/base -->

```tsx
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ExampleCombobox() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ExampleCombobox() {
  return (
    <Combobox allowsEmptyCollection>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxList
          renderEmptyState={() => (
            <ComboboxEmpty>No items found.</ComboboxEmpty>
          )}
        >
          {frameworks.map((item) => (
            <ComboboxItem key={item} id={item}>
              {item}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

<!-- ::end:only -->

## Composition

### Simple

A single-line input and a flat list (see [Basic](#basic)).

<!-- ::start:only react/base -->

```text
Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
Combobox
├── ComboboxInput
└── ComboboxContent
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem
```

<!-- ::end:only -->

### With chips

Multi-select with `multiple`, chips, and a chips input (see [Multiple](#multiple)).

<!-- ::start:only react/base -->

```text
Combobox
├── ComboboxChips
│   ├── ComboboxValue
│   │   └── ComboboxChip
│   └── ComboboxChipsInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
Combobox
├── ComboboxChips
│   ├── ComboboxChipList
│   │   └── ComboboxChip
│   └── ComboboxChipsInput
└── ComboboxContent
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem
```

<!-- ::end:only -->

### With groups and collection

<!-- ::start:only react/base -->

Nested items per group using `ComboboxCollection` inside each `ComboboxGroup`, with a separator between groups (see [Groups](#groups)).

```text
Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxGroup
        │   ├── ComboboxLabel
        │   └── ComboboxCollection
        │       ├── ComboboxItem
        │       └── ComboboxItem
        ├── ComboboxSeparator
        └── ComboboxGroup
            ├── ComboboxLabel
            └── ComboboxCollection
                ├── ComboboxItem
                └── ComboboxItem
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Nested items per group using `ComboboxGroup`, with a separator between groups (see [Groups](#groups)).

```text
Combobox
├── ComboboxInput
└── ComboboxContent
    └── ComboboxList
        ├── ComboboxGroup
        │   ├── ComboboxLabel
        │   ├── ComboboxItem
        │   └── ComboboxItem
        ├── ComboboxSeparator
        └── ComboboxGroup
            ├── ComboboxLabel
            ├── ComboboxItem
            └── ComboboxItem
```

<!-- ::end:only -->

## Custom Items

<!-- ::start:only react/base -->

Use `itemToStringValue` when your items are objects.

```tsx
import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

type Framework = {
  label: string
  value: string
}

const frameworks: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
]

export function ExampleComboboxCustomItems() {
  return (
    <Combobox
      items={frameworks}
      itemToStringValue={(framework) => framework.label}
    >
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(framework) => (
            <ComboboxItem key={framework.value} value={framework}>
              {framework.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `textValue` when your items render JSX children.

```tsx
import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

type Framework = {
  label: string
  value: string
}

const frameworks: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
]

export function ExampleComboboxCustomItems() {
  return (
    <Combobox allowsEmptyCollection>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxList
          renderEmptyState={() => (
            <ComboboxEmpty>No items found.</ComboboxEmpty>
          )}
          items={frameworks}
        >
          {(framework) => (
            <ComboboxItem id={framework.value} textValue={framework.label}>
              <span>{framework.label}</span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

<!-- ::end:only -->

## Multiple Selection

Use `multiple` with chips for multi-select behavior.

<!-- ::start:only react/base -->

```tsx
import * as React from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ExampleComboboxMultiple() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <Combobox
      items={frameworks}
      multiple
      value={value}
      onValueChange={setValue}
    >
      <ComboboxChips>
        <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Add framework" />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import * as React from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChipList,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ExampleComboboxMultiple() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <Combobox
      selectionMode="multiple"
      value={value}
      onChange={setValue}
      allowsEmptyCollection
    >
      <ComboboxChips>
        <ComboboxChipList<{ name: string }>>
          {(value) => <ComboboxChip id={value.name}>{value.name}</ComboboxChip>}
        </ComboboxChipList>
        <ComboboxChipsInput placeholder="Add framework" />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxList
          renderEmptyState={() => (
            <ComboboxEmpty>No items found.</ComboboxEmpty>
          )}
        >
          {frameworks.map((item) => (
            <ComboboxItem key={item} id={item}>
              {item}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

<!-- ::end:only -->

## Basic

A simple combobox with a list of frameworks.

<!-- ::preview item="combobox-basic" height="360" combinations="react/base,react/aria" -->

## Multiple

A combobox with multiple selection using `multiple` and `ComboboxChips`.

<!-- ::preview item="combobox-multiple" height="360" combinations="react/base,react/aria" -->

## Clear Button

Use the `showClear` prop to show a clear button.

<!-- ::preview item="combobox-clear" height="360" combinations="react/base,react/aria" -->

## Groups

Use `ComboboxGroup` and `ComboboxSeparator` to group items.

<!-- ::preview item="combobox-groups" height="360" combinations="react/base,react/aria" -->

## Custom Items

<!-- ::start:only react/base -->

You can render a custom component inside `ComboboxItem`.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

You can render custom component inside `ComboboxItem`.

<!-- ::end:only -->

<!-- ::preview item="combobox-custom" height="360" combinations="react/base,react/aria" -->

## Invalid

<!-- ::start:only react/base -->

Use the `aria-invalid` prop to make the combobox invalid.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `isInvalid` prop to make the combobox invalid.

<!-- ::end:only -->

<!-- ::preview item="combobox-invalid" height="360" combinations="react/base,react/aria" -->

## Disabled

<!-- ::start:only react/base -->

Use the `disabled` prop to disable the combobox.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `isDisabled` prop to disable the combobox.

<!-- ::end:only -->

<!-- ::preview item="combobox-disabled" height="360" combinations="react/base,react/aria" -->

## Auto Highlight

<!-- ::start:only react/base -->

Use the `autoHighlight` prop to automatically highlight the first item on filter.

<!-- ::preview item="combobox-auto-highlight" height="360" combinations="react/base" -->

<!-- ::end:only -->

## Popup

<!-- ::start:only react/base -->

You can trigger the combobox from a button or any other component by using the `render` prop. Move the `ComboboxInput` inside the `ComboboxContent`.

<!-- ::preview item="combobox-popup" height="360" combinations="react/base" -->

<!-- ::end:only -->

## Input Group

You can add an addon to the combobox by using the `InputGroupAddon` component inside the `ComboboxInput`.

<!-- ::preview item="combobox-input-group" height="360" combinations="react/base,react/aria" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI](https://base-ui.com/react/components/combobox#api-reference) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/ComboBox#api) documentation for more information.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
