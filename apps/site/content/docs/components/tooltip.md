---
title: Tooltip
description: A popup that displays information related to an element when it receives focus or is hovered.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords: [tooltip, component, base, aria, ark, vue, svelte, solid, angular]
---

# Tooltip

<!-- ::preview item="tooltip-demo" height="300" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="tooltip" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

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

### Angular

```ts
import { Component } from "@angular/core"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

@Component({
  selector: "app-example",
  imports: [Button, Tooltip, TooltipContent, TooltipTrigger],
  template: `
    <ng-container kuiTooltip>
      <button kuiButton kuiTooltipTrigger variant="outline">Hover</button>
      <div kuiTooltipContent><p>Add to library</p></div>
    </ng-container>
  `,
})
export class Example {}
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

<!-- ::preview item="tooltip-sides" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## With Keyboard Shortcut

<!-- ::preview item="tooltip-keyboard" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Disabled Button

Show a tooltip on a disabled button by wrapping it with a span.

<!-- ::preview item="tooltip-disabled" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="tooltip-rtl" height="300" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Tooltip](https://base-ui.com/react/components/tooltip#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Tooltip](https://react-aria.adobe.com/Tooltip#api) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Tooltip](https://ark-ui.com/vue/docs/components/tooltip#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Tooltip](https://ark-ui.com/svelte/docs/components/tooltip#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Tooltip](https://ark-ui.com/solid/docs/components/tooltip#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

Angular's popups are the registry's own layer on Floating UI (`lib/angular/popup.ts`), in Base UI's markup: it takes Base UI's props (`side`, `align`, `sideOffset`, `alignOffset`, `[(open)]`, `defaultOpen`).

<!-- ::end:only -->
