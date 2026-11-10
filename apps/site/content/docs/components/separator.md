---
title: Separator
description: Visually or semantically separates content.
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
keywords: [separator, component, base, aria, ark, vue, svelte, solid, angular]
---

# Separator

<!-- ::preview item="separator-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="separator" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Usage

```tsx
import { Separator } from "@/components/ui/separator"

export function Example() {
  return (
    <>
      <Separator />
      <Separator orientation="vertical" />
    </>
  )
}
```

## Vertical

Use `orientation="vertical"` for a vertical separator.

<!-- ::preview item="separator-vertical" height="400" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Menu

Vertical separators between menu items with descriptions.

<!-- ::preview item="separator-menu" height="400" wide="true" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## List

Horizontal separators between list items.

<!-- ::preview item="separator-list" height="400" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="separator-rtl" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Separator](https://base-ui.com/react/components/separator#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Separator](https://react-aria.adobe.com/Separator#api) documentation.

<!-- ::end:only -->
