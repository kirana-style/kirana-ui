---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
section: components
variants:
  [react/base, react/aria, vue/ark, vue/reka, svelte/ark, solid/ark, angular/ng]
keywords:
  [
    toggle group,
    toggle,
    buttons,
    component,
    base,
    aria,
    ark,
    vue,
    svelte,
    solid,
  ]
---

# Toggle Group

<!-- ::preview item="toggle-group-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="toggle-group" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

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

<!-- ::start:only vue/ark,vue/reka -->

```vue
<template>
  <ToggleGroup>
    <ToggleGroupItem value="a">A</ToggleGroupItem>
    <ToggleGroupItem value="b">B</ToggleGroupItem>
    <ToggleGroupItem value="c">C</ToggleGroupItem>
  </ToggleGroup>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<ToggleGroup>
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
<ToggleGroup>
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

@Component({
  selector: "app-example",
  imports: [ToggleGroup, ToggleGroupItem],
  template: `
    <div kuiToggleGroup>
      <button kuiToggleGroupItem value="a">A</button>
      <button kuiToggleGroupItem value="b">B</button>
      <button kuiToggleGroupItem value="c">C</button>
    </div>
  `,
})
export class Example {}
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

<!-- ::preview item="toggle-group-outline" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Size

Use the `size` prop to change the size of the toggle group.

<!-- ::preview item="toggle-group-sizes" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Spacing

Use `spacing` to add spacing between toggle group items.

<!-- ::preview item="toggle-group-spacing" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Vertical

Use `orientation="vertical"` for vertical toggle groups.

<!-- ::preview item="toggle-group-vertical" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Disabled

<!-- ::preview item="toggle-group-disabled" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Custom

A custom toggle group example.

<!-- ::preview item="toggle-group-font-weight-selector" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="toggle-group-rtl" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Toggle Group](https://base-ui.com/react/components/toggle-group#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria ToggleButtonGroup](https://react-aria.adobe.com/ToggleButtonGroup#api) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Toggle Group](https://ark-ui.com/vue/docs/components/toggle-group#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/reka -->

See the [Reka UI Toggle Group](https://reka-ui.com/docs/components/toggle-group#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Toggle Group](https://ark-ui.com/svelte/docs/components/toggle-group#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Toggle Group](https://ark-ui.com/solid/docs/components/toggle-group#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

See the [ng-primitives Toggle Group](https://angularprimitives.dev/primitives/toggle-group) documentation. Angular's takes Base UI's `multiple` (one item pressed at a time without it), `[(value)]` or `defaultValue`, `variant`, `size` and `spacing`.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
