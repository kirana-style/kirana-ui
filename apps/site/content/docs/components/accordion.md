---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
section: components
variants: [react/base, react/aria]
keywords: [accordion, disclosure, collapsible, component, base, aria]
---

# Accordion

<!-- ::preview item="accordion-demo" height="300" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="accordion" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
```

<!-- ::start:only react/base -->

```tsx
<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
<Accordion defaultExpandedKeys={["item-1"]}>
  <AccordionItem id="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

<!-- ::end:only -->

## Composition

Use the following composition to build an `Accordion`:

```text
Accordion
├── AccordionItem
│   ├── AccordionTrigger
│   └── AccordionContent
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionContent
```

## Basic

A basic accordion that shows one item at a time. The first item is open by default.

<!-- ::preview item="accordion-basic" height="300" combinations="react/base,react/aria" -->

## Multiple

<!-- ::start:only react/base -->

Use the `multiple` prop to allow multiple items to be open at the same time.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `allowsMultipleExpanded` prop to allow multiple items to be open at the same time.

<!-- ::end:only -->

<!-- ::preview item="accordion-multiple" height="450" combinations="react/base,react/aria" -->

## Disabled

<!-- ::start:only react/base -->

Use the `disabled` prop on `AccordionItem` to disable individual items.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `isDisabled` prop on `AccordionItem` to disable individual items.

<!-- ::end:only -->

<!-- ::preview item="accordion-disabled" height="300" combinations="react/base,react/aria" -->

## Borders

Give the `Accordion` a border and each `AccordionItem` a bottom border, none on the last, through
`sx` to draw lines around the items.

<!-- ::preview item="accordion-borders" height="300" combinations="react/base,react/aria" -->

## Card

Wrap the `Accordion` in a `Card` component.

<!-- ::preview item="accordion-card" height="435" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="accordion-rtl" height="300" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Accordion](https://base-ui.com/react/components/accordion#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria DisclosureGroup](https://react-aria.adobe.com/DisclosureGroup#api) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
