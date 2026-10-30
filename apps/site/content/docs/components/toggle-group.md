---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
section: components
variants: [react/base, react/aria]
keywords: [toggle group, toggle, buttons, component, base, aria]
---

# Toggle Group

<!-- ::preview item="toggle-group-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="toggle-group" combinations="react/base,react/aria" -->

## Usage

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
```

<!-- ::start:only react/base -->

```tsx
<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
<ToggleGroup selectionMode="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `ToggleGroup`:

```text
ToggleGroup
├── ToggleGroupItem
└── ToggleGroupItem
```

## Outline

Use `variant="outline"` for an outline style.

<!-- ::preview item="toggle-group-outline" height="360" combinations="react/base,react/aria" -->

## Size

Use the `size` prop to change the size of the toggle group.

<!-- ::preview item="toggle-group-sizes" height="360" combinations="react/base,react/aria" -->

## Spacing

Use `spacing` to add spacing between toggle group items.

<!-- ::preview item="toggle-group-spacing" height="360" combinations="react/base,react/aria" -->

## Vertical

Use `orientation="vertical"` for vertical toggle groups.

<!-- ::preview item="toggle-group-vertical" height="360" combinations="react/base,react/aria" -->

## Disabled

<!-- ::preview item="toggle-group-disabled" height="360" combinations="react/base,react/aria" -->

## Custom

A custom toggle group example.

<!-- ::preview item="toggle-group-font-weight-selector" height="360" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="toggle-group-rtl" height="360" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Toggle Group](https://base-ui.com/react/components/toggle-group#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria ToggleButtonGroup](https://react-aria.adobe.com/ToggleButtonGroup#api) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
