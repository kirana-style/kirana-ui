---
title: Collapsible
description: An interactive component which expands and collapses a panel.
section: components
order: 6
keywords: [collapsible, component, base, aria]
---

# Collapsible

<!-- ::preview item="collapsible-demo" height="400" combinations="react/base,react/aria" -->

## Installation

With `kirana-style ui`, for every framework:

<!-- ::install exec="kirana-style ui add collapsible" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/collapsible" -->

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

## Code

What installing it writes, in the default style, for the framework and base you choose:

<!-- ::component-code name="collapsible" combinations="react/base,react/aria" -->

## Notes per base

React Aria's collapsible is its `Disclosure`: the trigger is any button with `slot="trigger"`, and it opens with `isExpanded` and `onExpandedChange` where Base UI's takes `open` and `onOpenChange`.
