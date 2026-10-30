---
title: Dialog
description: A window overlaid on the page.
section: components
variants: [react/base, react/aria, vue/ark]
keywords: [dialog, component, base, aria, ark]
---

# Dialog

<!-- ::preview item="dialog-demo" height="420" combinations="react/base,react/aria,vue/ark" -->

## Installation

<!-- ::installation name="dialog" combinations="react/base,react/aria,vue/ark" -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Example() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
```

### React Aria

```tsx
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Example() {
  return (
    <DialogTrigger>
      <Button variant="outline">Open</Button>
      <Dialog>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
      </Dialog>
    </DialogTrigger>
  )
}
```

### Vue

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">Open</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
```

<!-- ::end:tabs -->

<!-- ::start:only react/aria -->

## Notes per base

On React Aria, `DialogTrigger` holds both the button and the dialog, which has no separate content part.

<!-- ::end:only -->

## Composition

Use the following composition to build a `Dialog`:

<!-- ::start:only react/base -->

```text
Dialog
├── DialogTrigger
└── DialogContent
    ├── DialogHeader
    │   ├── DialogTitle
    │   └── DialogDescription
    └── DialogFooter
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
DialogTrigger
├── Button
└── Dialog
    ├── DialogHeader
    │   ├── DialogTitle
    │   └── DialogDescription
    └── DialogFooter
```

<!-- ::end:only -->

## Custom Close Button

Replace the default close control with your own button.

<!-- ::preview item="dialog-close-button" height="400" combinations="react/base,react/aria" -->

## No Close Button

Use `showCloseButton={false}` to hide the close button.

<!-- ::preview item="dialog-no-close-button" height="400" combinations="react/base,react/aria" -->

## Sticky Footer

Keep actions visible while the content scrolls.

<!-- ::preview item="dialog-sticky-footer" height="400" combinations="react/base,react/aria" -->

## Scrollable Content

Long content can scroll while the header stays in view.

<!-- ::preview item="dialog-scrollable-content" height="400" combinations="react/base,react/aria" -->

<!-- ::start:only react/base,react/aria -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="dialog-rtl" height="420" combinations="react/base,react/aria" direction="rtl" -->

<!-- ::end:only -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI](https://base-ui.com/react/components/dialog#api-reference) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/Modal#api) documentation for more information.

<!-- ::end:only -->
