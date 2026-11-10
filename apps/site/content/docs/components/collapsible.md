---
title: Collapsible
description: An interactive component which expands and collapses a panel.
section: components
variants:
  [
    react/base,
    react/aria,
    vue/ark,
    vue/reka,
    svelte/ark,
    svelte/bits,
    solid/ark,
    angular/ng,
  ]
keywords: [collapsible, component, base, aria, ark, vue, svelte, solid, angular]
---

# Collapsible

<!-- ::preview item="collapsible-demo" height="400" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="collapsible" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects.
      </CollapsibleContent>
    </Collapsible>
  )
}
```

### React Aria

```tsx
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

export function Example() {
  return (
    <Collapsible>
      <Button slot="trigger" variant="ghost">
        Can I use this in my project?
      </Button>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects.
      </CollapsibleContent>
    </Collapsible>
  )
}
```

<!-- ::end:tabs -->

## Notes per base

React Aria's collapsible is its `Disclosure`: the trigger is any button with `slot="trigger"`, and it opens with `isExpanded` and `onExpandedChange` where Base UI's takes `open` and `onOpenChange`.

## Composition

Use the following composition to build a `Collapsible`:

```text
Collapsible
├── CollapsibleTrigger
└── CollapsibleContent
```

## Controlled State

<!-- ::start:only react/base -->

Use the `open` and `onOpenChange` props to control the state.

<!-- ::end:only -->

<!-- ::start:only react/base -->

```tsx showLineNumbers
import * as React from "react"

export function Example() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `isExpanded` and `onExpandedChange` props to control the state.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
import * as React from "react"

export function Example() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible isExpanded={open} onExpandedChange={setOpen}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}
```

<!-- ::end:only -->

## Basic

<!-- ::preview item="collapsible-basic" height="400" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Settings Panel

Use a trigger button to reveal additional settings.

<!-- ::preview item="collapsible-settings" height="400" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## File Tree

Use nested collapsibles to build a file tree. In a conversation, this is the [File Tree](/docs/ai-elements/file-tree) pattern.

<!-- ::preview item="collapsible-file-tree" height="400" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="collapsible-rtl" height="400" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI](https://base-ui.com/react/components/collapsible#api-reference) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/Disclosure#api) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Collapsible](https://ark-ui.com/vue/docs/components/collapsible#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/reka -->

See the [Reka UI Collapsible](https://reka-ui.com/docs/components/collapsible#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Collapsible](https://ark-ui.com/svelte/docs/components/collapsible#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/bits -->

See the [Bits UI Collapsible](https://bits-ui.com/docs/components/collapsible#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Collapsible](https://ark-ui.com/solid/docs/components/collapsible#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

See the [ng-primitives Collapsible](https://angularprimitives.dev/primitives/collapsible) documentation.

<!-- ::end:only -->
