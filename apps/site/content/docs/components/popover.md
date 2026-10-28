---
title: Popover
description: Displays rich content in a portal, triggered by a button.
section: components
variants: [react/base, react/aria]
keywords: [popover, popup, floating, overlay, component, base, aria]
---

# Popover

<!-- ::preview item="popover-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="popover" combinations="react/base,react/aria" -->

## Usage

<!-- ::start:only react/base -->

```tsx
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
```

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open Popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description text here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
```

```tsx
<PopoverTrigger>
  <Button variant="outline">Open Popover</Button>
  <Popover>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description text here.</PopoverDescription>
    </PopoverHeader>
  </Popover>
</PopoverTrigger>
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `Popover`:

<!-- ::start:only react/base -->

```text
Popover
├── PopoverTrigger
└── PopoverContent
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
PopoverTrigger
├── Button
└── Popover
```

<!-- ::end:only -->

## Basic

A simple popover with a header, title, and description.

<!-- ::preview item="popover-basic" height="360" combinations="react/base,react/aria" -->

## Align

<!-- ::start:only react/base -->

Use the `align` prop on `PopoverContent` to control the horizontal alignment.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `placement` prop on `Popover` to control the horizontal alignment.

<!-- ::end:only -->

<!-- ::preview item="popover-alignments" height="360" combinations="react/base,react/aria" -->

## With Form

A popover with form fields inside.

<!-- ::preview item="popover-form" height="360" combinations="react/base,react/aria" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Popover](https://base-ui.com/react/components/popover#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Popover](https://react-aria.adobe.com/Popover#api) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
