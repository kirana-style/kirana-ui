---
title: Toast
description: A succinct message that is displayed temporarily.
section: components
variants: [react/base, vue/ark]
keywords: [toast, notification, component, base, ark, vue]
---

# Toast

<!-- ::preview item="toast-demo" height="300" combinations="react/base,vue/ark" -->

## Installation

<!-- ::installation name="toast" combinations="react/base,vue/ark" -->

Then add the `Toaster` component to your root layout:

<!-- ::start:only react/base -->

```tsx
import { Toaster } from "@/components/ui/toast"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<script setup lang="ts">
import { Toaster } from "@/components/ui/toast"
</script>

<template>
  <main><RouterView /></main>
  <Toaster />
</template>
```

<!-- ::end:only -->

## Usage

```tsx
import { toast } from "@/components/ui/toast"
```

```tsx
toast.add({
  title: "Event created",
  description: "Sunday, December 3 at 9:00 AM",
})
```

## Types

Set the `type` option to render a status icon. The built-in renderer recognizes
`success`, `info`, `warning`, `error`, and `loading`. Each status icon has its colour, where
shadcn/ui's keep the text's but the error's: green for `success`, sky for `info`, orange for
`warning` and the destructive red for `error`.

<!-- ::preview item="toast-types" height="300" combinations="react/base,vue/ark" -->

## Action

Pass button props with `actionProps` to render an action.

```tsx
const id = toast.add({
  title: "Event created",
  actionProps: {
    children: "Undo",
    onClick() {
      toast.close(id)
    },
  },
})
```

## Promise

Use `toast.promise` to update one toast as an asynchronous task moves through
loading, success, and error states.

<!-- ::preview item="toast-promise" height="300" combinations="react/base,vue/ark" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Toast documentation](https://base-ui.com/react/components/toast)
for details about manager options, stacking, swipe dismissal, and the primitive
API.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

`toast` takes Base UI's calls (`add`, `close`, `update` and `promise`, with `title`,
`description`, `type`, `timeout` and `actionProps`) and makes the toasts with Ark UI's toaster,
which `toaster` is; it places them at the bottom end, three at most, as Base UI's are. See the
[Ark UI Toast documentation](https://ark-ui.com/vue/docs/components/toast#api-reference) for the
toaster's own options and the parts.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
