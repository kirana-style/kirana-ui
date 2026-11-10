---
title: Sonner
description: An opinionated toast component for React.
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
keywords:
  [sonner, toast, notification, component, base, aria, ark, vue, svelte, solid]
---

# Sonner

<!-- ::preview item="sonner-demo" height="300" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## About

Sonner is built and maintained by [emilkowalski](https://twitter.com/emilkowalski).

## Installation

<!-- ::installation name="sonner" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

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

<!-- ::start:only angular/ng -->

On Angular, `toast()` comes from `ngx-sonner`, Sonner's Angular port, and the toaster is
mounted once, at the app's root:

```ts
import { Component } from "@angular/core"
import { toast } from "ngx-sonner"

import { Toaster } from "@/components/ui/sonner"

@Component({
  selector: "app-root",
  imports: [Toaster],
  template: `
    <button (click)="toast('Event has been created.')">Show Toast</button>
    <kui-toaster position="top-center" />
  `,
})
export class App {
  protected readonly toast = toast
}
```

<!-- ::end:only -->

## Types

<!-- ::preview item="sonner-types" height="300" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Description

<!-- ::preview item="sonner-description" height="300" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Position

Use the `position` prop to change the position of the toast.

<!-- ::preview item="sonner-position" height="300" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## API Reference

See the [Sonner API Reference](https://sonner.emilkowal.ski/getting-started) for more information.

<!-- ::start:only angular/ng -->

See the [ngx-sonner](https://github.com/tutkli/ngx-sonner) documentation: Sonner's Angular port, which takes Sonner's options but not its `icons`.

<!-- ::end:only -->
