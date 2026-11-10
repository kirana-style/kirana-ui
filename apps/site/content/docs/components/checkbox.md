---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
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
  [checkbox, form, field, component, base, aria, ark, vue, svelte, solid]
---

# Checkbox

<!-- ::preview item="checkbox-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="checkbox" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Checkbox />
```

<!-- ::end:only -->

<!-- ::start:only vue/ark,vue/reka -->

```vue
<template>
  <Checkbox />
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark,svelte/bits -->

```svelte
<Checkbox />
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
<Checkbox />
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { Checkbox } from "@/components/ui/checkbox"

@Component({
  selector: "app-example",
  imports: [Checkbox],
  template: ` <span kuiCheckbox></span> `,
})
export class Example {}
```

<!-- ::end:only -->

## Checked State

<!-- ::start:only react/base -->

Use `defaultChecked` for uncontrolled checkboxes, or `checked` and
`onCheckedChange` to control the state.

```tsx
import * as React from "react"

export function Example() {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox checked={checked} onCheckedChange={setChecked} />
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `defaultSelected` for uncontrolled checkboxes, or `isSelected` and
`onChange` to control the state.

```tsx
import * as React from "react"

export function Example() {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox isSelected={checked} onChange={setChecked} />
}
```

<!-- ::end:only -->

## Invalid State

<!-- ::start:only react/base -->

Set `aria-invalid` on the checkbox and `data-invalid` on the field wrapper to
show the invalid styles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Set `isInvalid` on the checkbox and `data-invalid` on the field wrapper to
show the invalid styles.

<!-- ::end:only -->

<!-- ::preview item="checkbox-invalid" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Basic

Pair the checkbox with `Field` and `FieldLabel` for proper layout and labeling.

<!-- ::preview item="checkbox-basic" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Description

Use `FieldContent` and `FieldDescription` for helper text.

<!-- ::preview item="checkbox-description" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Disabled

<!-- ::start:only react/base -->

Use the `disabled` prop to prevent interaction and add the `data-disabled` attribute to the `<Field>` component for disabled styles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `isDisabled` prop to prevent interaction and add the `data-disabled` attribute to the `<Field>` component for disabled styles.

<!-- ::end:only -->

<!-- ::preview item="checkbox-disabled" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Group

Use multiple fields to create a checkbox list.

<!-- ::preview item="checkbox-group" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Table

<!-- ::preview item="checkbox-table" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="checkbox-rtl" height="320" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI](https://base-ui.com/react/components/checkbox#api-reference) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/Checkbox#api) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Checkbox](https://ark-ui.com/vue/docs/components/checkbox#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/reka -->

See the [Reka UI Checkbox](https://reka-ui.com/docs/components/checkbox#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Checkbox](https://ark-ui.com/svelte/docs/components/checkbox#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/bits -->

See the [Bits UI Checkbox](https://bits-ui.com/docs/components/checkbox#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Checkbox](https://ark-ui.com/solid/docs/components/checkbox#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

See the [ng-primitives Checkbox](https://angularprimitives.dev/primitives/checkbox) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
