---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
section: components
variants:
  [
    react/kirana,
    react/base,
    react/aria,
    react/uisdk,
    vue/kirana,
    vue/ark,
    vue/reka,
    vue/uisdk,
    svelte/kirana,
    svelte/ark,
    svelte/bits,
    svelte/uisdk,
    solid/kirana,
    solid/ark,
    solid/uisdk,
    angular/kirana,
    angular/ng,
  ]
keywords:
  [textarea, input, form, component, base, aria, ark, vue, svelte, solid]
---

# Textarea

<!-- ::preview item="textarea-demo" height="360" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,solid/uisdk,angular/ng" -->

## Installation

<!-- ::installation name="textarea" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,solid/uisdk,angular/kirana,angular/ng" -->

## Usage

```tsx
import { Textarea } from "@/components/ui/textarea"
```

<!-- ::start:only react/kirana,react/base,react/aria,react/uisdk -->

```tsx
<Textarea />
```

<!-- ::end:only -->

<!-- ::start:only vue/kirana,vue/ark,vue/reka,vue/uisdk -->

```vue
<template>
  <Textarea />
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk -->

```svelte
<Textarea />
```

<!-- ::end:only -->

<!-- ::start:only solid/kirana,solid/ark,solid/uisdk -->

```tsx
<Textarea />
```

<!-- ::end:only -->

<!-- ::start:only angular/kirana,angular/ng -->

```ts
import { Component } from "@angular/core"
import { Textarea } from "@/components/ui/textarea"

@Component({
  selector: "app-example",
  imports: [Textarea],
  template: ` <textarea kuiTextarea></textarea> `,
})
export class Example {}
```

<!-- ::end:only -->

## Field

Use `Field`, `FieldLabel`, and `FieldDescription` to create a textarea with a label and description.

<!-- ::preview item="textarea-field" height="360" combinations="react/kirana,react/base,react/aria,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,solid/uisdk,angular/ng" -->

## Disabled

Use the `disabled` prop to disable the textarea. To style the disabled state, add the `data-disabled` attribute to the `Field` component.

<!-- ::preview item="textarea-disabled" height="360" combinations="react/kirana,react/base,react/aria,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,solid/uisdk,angular/ng" -->

## Invalid

Use the `aria-invalid` prop to mark the textarea as invalid. To style the invalid state, add the `data-invalid` attribute to the `Field` component.

<!-- ::preview item="textarea-invalid" height="360" combinations="react/kirana,react/base,react/aria,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,solid/uisdk,angular/ng" -->

## Button

Pair with `Button` to create a textarea with a submit button.

<!-- ::preview item="textarea-button" height="360" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,solid/uisdk,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="textarea-rtl" height="360" combinations="react/base,react/aria,vue/kirana,vue/ark,vue/reka,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,solid/uisdk,angular/ng" direction="rtl" -->
