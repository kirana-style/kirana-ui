---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords:
  [switch, toggle, form, field, component, base, aria, ark, vue, svelte, solid]
---

# Switch

<!-- ::preview item="switch-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="switch" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Usage

```tsx
import { Switch } from "@/components/ui/switch"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Switch />
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <Switch />
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<Switch />
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
<Switch />
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { Switch } from "@/components/ui/switch"

@Component({
  selector: "app-example",
  imports: [Switch],
  template: ` <span kuiSwitch></span> `,
})
export class Example {}
```

<!-- ::end:only -->

## Description

<!-- ::preview item="switch-description" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Choice Card

Card-style selection where `FieldLabel` wraps the entire `Field` for a clickable card pattern.

<!-- ::preview item="switch-choice-card" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Disabled

<!-- ::start:only react/base -->

Add the `disabled` prop to the `Switch` component to disable the switch. Add the `data-disabled` prop to the `Field` component for styling.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Add the `isDisabled` prop to the `Switch` component to disable the switch. Add the `data-disabled` prop to the `Field` component for styling.

<!-- ::end:only -->

<!-- ::preview item="switch-disabled" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Invalid

<!-- ::start:only react/base -->

Add the `aria-invalid` prop to the `Switch` component to indicate an invalid state. Add the `data-invalid` prop to the `Field` component for styling.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Add the `data-invalid` prop to the `Switch` component to indicate an invalid state. Add the `data-invalid` prop to the `Field` component for styling.

<!-- ::end:only -->

<!-- ::preview item="switch-invalid" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Size

Use the `size` prop to change the size of the switch.

<!-- ::preview item="switch-sizes" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="switch-rtl" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Switch](https://base-ui.com/react/components/switch#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Switch](https://react-aria.adobe.com/Switch#api) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Switch](https://ark-ui.com/vue/docs/components/switch#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Switch](https://ark-ui.com/svelte/docs/components/switch#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Switch](https://ark-ui.com/solid/docs/components/switch#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

See the [ng-primitives Switch](https://angularprimitives.dev/primitives/switch) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
