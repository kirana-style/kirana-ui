---
title: Dialog
description: A window overlaid on the page.
section: components
order: 7
keywords: [dialog, component, base, aria, ark]
---

# Dialog

<!-- ::preview item="dialog-demo" height="420" combinations="react/base,react/aria,vue/ark" -->

## Installation

With `kirana-style ui`, for every framework:

<!-- ::install exec="kirana-style ui add dialog" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/dialog" -->

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

### Ark UI

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

## Code

What installing it writes, in the default style, for the framework and base you choose:

<!-- ::component-code name="dialog" combinations="react/base,react/aria,vue/ark" -->

## Notes per base

On React Aria, `DialogTrigger` holds both the button and the dialog, which has no separate content part.
