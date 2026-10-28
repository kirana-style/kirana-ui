---
title: Sheet
description: Extends the Dialog to display content from an edge of the screen.
section: components
variants: [react/base, react/aria]
keywords: [sheet, component, base, aria]
---

# Sheet

<!-- ::preview item="sheet-demo" height="420" combinations="react/base,react/aria" -->

A sheet slides in from the side its `side` names: `top`, `right`, `bottom` or `left`.

## Installation

With `kirana-style ui`:

<!-- ::install exec="kirana-style ui add sheet" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/sheet" -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
```

### React Aria

```tsx
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Example() {
  return (
    <SheetTrigger>
      <Button variant="outline">Open</Button>
      <Sheet side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
      </Sheet>
    </SheetTrigger>
  )
}
```

<!-- ::end:tabs -->

## Code

What installing it writes, in the default style:

<!-- ::component-code name="sheet" combinations="react/base,react/aria" -->
