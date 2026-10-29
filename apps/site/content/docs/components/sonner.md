---
title: Sonner
description: An opinionated toast component for React.
section: components
variants: [react/base, react/aria]
keywords: [sonner, toast, notification, component, base, aria]
---

# Sonner

<!-- ::preview item="sonner-demo" height="300" combinations="react/base,react/aria" -->

## About

Sonner is built and maintained by [emilkowalski](https://twitter.com/emilkowalski).

## Installation

<!-- ::installation name="sonner" combinations="react/base,react/aria" -->

Then add the `Toaster` to your root layout:

```tsx
import { Toaster } from "@/components/ui/sonner"

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

Upstream's `Toaster` reads the colour mode from `next-themes`; this one takes Sonner's `theme`
prop (`light`, `dark` or `system`, the default), so pass it from wherever your app keeps the mode.

## Usage

```tsx
import { toast } from "sonner"
```

```tsx
toast("Event has been created.")
```

## Types

<!-- ::preview item="sonner-types" height="300" combinations="react/base,react/aria" -->

## Description

<!-- ::preview item="sonner-description" height="300" combinations="react/base,react/aria" -->

## Position

Use the `position` prop to change the position of the toast.

<!-- ::preview item="sonner-position" height="300" combinations="react/base,react/aria" -->

## API Reference

See the [Sonner API Reference](https://sonner.emilkowal.ski/getting-started) for more information.
