---
title: Collapsible
description: An interactive component which expands and collapses a panel.
section: components
variants: [react/base, react/aria]
keywords: [collapsible, component, base, aria]
---

# Collapsible

<!-- ::preview item="collapsible-demo" height="400" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="collapsible" combinations="react/base,react/aria" -->

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
