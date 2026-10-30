---
title: Tooltip
description: A popup that displays information related to an element when it receives focus or is hovered.
section: components
variants: [react/base, react/aria]
keywords: [tooltip, component, base, aria]
---

# Tooltip

<!-- ::preview item="tooltip-demo" height="300" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="tooltip" combinations="react/base,react/aria" -->

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

## Composition

Use the following composition to build a `Tooltip`:

<!-- ::start:only react/base -->

```text
Tooltip
├── TooltipTrigger
└── TooltipContent
```

<!-- ::end:only -->

## Side

<!-- ::start:only react/base -->

Use the `side` prop to change the position of the tooltip.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
TooltipTrigger
├── Button
└── Tooltip
```

<!-- ::end:only -->

## Placement

<!-- ::start:only react/aria -->

Use the `placement` prop to change the position of the tooltip.

<!-- ::end:only -->

<!-- ::preview item="tooltip-sides" height="400" combinations="react/base,react/aria" -->

## With Keyboard Shortcut

<!-- ::preview item="tooltip-keyboard" height="400" combinations="react/base,react/aria" -->

## Disabled Button

Show a tooltip on a disabled button by wrapping it with a span.

<!-- ::preview item="tooltip-disabled" height="400" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="tooltip-rtl" height="300" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Tooltip](https://base-ui.com/react/components/tooltip#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Tooltip](https://react-aria.adobe.com/Tooltip#api) documentation.

<!-- ::end:only -->
