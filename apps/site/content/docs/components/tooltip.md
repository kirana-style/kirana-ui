---
title: Tooltip
description: A popup that displays information related to an element when it receives focus or is hovered.
section: components
order: 18
keywords: [tooltip, component, base, aria]
---

# Tooltip

<!-- ::preview item="tooltip-demo" height="300" combinations="react/base,react/aria" -->

## Installation

With `kirana-style ui`, for every framework:

<!-- ::install exec="kirana-style ui add tooltip" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/tooltip" -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Example() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  )
}
```

### React Aria

```tsx
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"

export function Example() {
  return (
    <TooltipTrigger>
      <Button variant="outline">Hover</Button>
      <Tooltip>Add to library</Tooltip>
    </TooltipTrigger>
  )
}
```

<!-- ::end:tabs -->

## Code

What installing it writes, in the default style, for the framework and base you choose:

<!-- ::component-code name="tooltip" combinations="react/base,react/aria" -->
