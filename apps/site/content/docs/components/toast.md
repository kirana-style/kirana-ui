---
title: Toast
description: A succinct message that is displayed temporarily.
section: components
variants: [react/base]
keywords: [toast, notification, component, base]
---

# Toast

<!-- ::preview item="toast-demo" height="300" combinations="react/base" -->

## Installation

<!-- ::installation name="toast" combinations="react/base" -->

Then add the `Toaster` component to your root layout:

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

<!-- ::preview item="toast-types" height="300" combinations="react/base" -->

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

<!-- ::preview item="toast-promise" height="300" combinations="react/base" -->

## API Reference

See the [Base UI Toast documentation](https://base-ui.com/react/components/toast)
for details about manager options, stacking, swipe dismissal, and the primitive
API.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
