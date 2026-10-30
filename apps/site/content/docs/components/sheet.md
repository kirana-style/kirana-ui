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

<!-- ::installation name="sheet" combinations="react/base,react/aria" -->

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

## Composition

Use the following composition to build a `Sheet`:

<!-- ::start:only react/base -->

```text
Sheet
├── SheetTrigger
└── SheetContent
    ├── SheetHeader
    │   ├── SheetTitle
    │   └── SheetDescription
    └── SheetFooter
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
SheetTrigger
├── Button
└── Sheet
    ├── SheetHeader
    │   ├── SheetTitle
    │   └── SheetDescription
    └── SheetFooter
```

<!-- ::end:only -->

## Side

Use the `side` prop on `SheetContent` to set the edge of the screen where the sheet appears. Values are `top`, `right`, `bottom`, or `left`.

<!-- ::preview item="sheet-side" height="640" combinations="react/base,react/aria" -->

## No Close Button

Use `showCloseButton={false}` on `SheetContent` to hide the close button.

<!-- ::preview item="sheet-no-close-button" height="400" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="sheet-rtl" height="420" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Dialog](https://base-ui.com/react/components/dialog#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Modal](https://react-aria.adobe.com/Modal#api) documentation.

<!-- ::end:only -->
