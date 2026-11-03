---
title: Spinner
description: An indicator that can be used to show a loading state.
section: components
variants: [react/base, react/aria, vue/ark]
keywords: [spinner, loading, loader, component, base, aria, ark, vue]
---

# Spinner

<!-- ::preview item="spinner-demo" height="360" combinations="react/base,react/aria,vue/ark" -->

## Installation

<!-- ::installation name="spinner" combinations="react/base,react/aria,vue/ark" -->

## Usage

```tsx
import { Spinner } from "@/components/ui/spinner"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Spinner />
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <Spinner />
</template>
```

<!-- ::end:only -->

## Customization

You can replace the default spinner icon with any other icon by editing the `Spinner` component.

<!-- ::preview item="spinner-custom" height="360" combinations="react/base,react/aria,vue/ark" -->

```tsx
import { props } from "@kirana-style/core"
import { LoaderIcon } from "lucide-react"

import type { Sx } from "@/lib/kirana/sx"
import { spinner } from "./spinner.styles"

function Spinner({
  sx,
  ...rest
}: Omit<React.ComponentProps<"svg">, "className"> & { sx?: Sx }) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      {...rest}
      {...props(spinner, sx)}
    />
  )
}

export { Spinner }
```

The icon takes its style as `props(…)`, not `sx`: it is a component from a package, which does not
read `sx`.

## Size

Use the `size-*` utility class to change the size of the spinner.

<!-- ::preview item="spinner-size" height="360" combinations="react/base,react/aria,vue/ark" -->

## Button

Add a spinner to a button to indicate a loading state. Place the `<Spinner />` before the label with `data-icon="inline-start"` for a start position, or after the label with `data-icon="inline-end"` for an end position.

<!-- ::preview item="spinner-button" height="360" combinations="react/base,react/aria,vue/ark" -->

## Badge

Add a spinner to a badge to indicate a loading state. Place the `<Spinner />` before the label with `data-icon="inline-start"` for a start position, or after the label with `data-icon="inline-end"` for an end position.

<!-- ::preview item="spinner-badge" height="360" combinations="react/base,react/aria,vue/ark" -->

## Input Group

<!-- ::preview item="spinner-input-group" height="360" combinations="react/base,react/aria,vue/ark" -->

## Empty

<!-- ::preview item="spinner-empty" height="360" combinations="react/base,react/aria,vue/ark" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="spinner-rtl" height="360" combinations="react/base,react/aria,vue/ark" direction="rtl" -->
