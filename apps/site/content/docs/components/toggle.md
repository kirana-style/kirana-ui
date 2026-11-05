---
title: Toggle
description: A two-state button that can be either on or off.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords:
  [toggle, button, pressed, component, base, aria, ark, vue, svelte, solid]
---

# Toggle

<!-- ::preview item="toggle-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="toggle" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Usage

```tsx
import { Toggle } from "@/components/ui/toggle"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Toggle>Toggle</Toggle>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <Toggle>Toggle</Toggle>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<Toggle>Toggle</Toggle>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
<Toggle>Toggle</Toggle>
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { Toggle } from "@/components/ui/toggle"

@Component({
  selector: "app-example",
  imports: [Toggle],
  template: ` <button kuiToggle>Toggle</button> `,
})
export class Example {}
```

<!-- ::end:only -->

## Outline

Use `variant="outline"` for an outline style.

<!-- ::preview item="toggle-outline" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## With Text

<!-- ::preview item="toggle-text" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Size

Use the `size` prop to change the size of the toggle.

<!-- ::preview item="toggle-sizes" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Disabled

<!-- ::preview item="toggle-disabled" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="toggle-rtl" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Toggle](https://base-ui.com/react/components/toggle#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria ToggleButton](https://react-aria.adobe.com/ToggleButton#api) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Toggle](https://ark-ui.com/vue/docs/components/toggle#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Toggle](https://ark-ui.com/svelte/docs/components/toggle#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Toggle](https://ark-ui.com/solid/docs/components/toggle#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

See the [ng-primitives Toggle](https://angularprimitives.dev/primitives/toggle) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
