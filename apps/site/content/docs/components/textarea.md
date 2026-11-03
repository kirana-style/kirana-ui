---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark]
keywords: [textarea, input, form, component, base, aria, ark, vue, svelte]
---

# Textarea

<!-- ::preview item="textarea-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Installation

<!-- ::installation name="textarea" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Usage

```tsx
import { Textarea } from "@/components/ui/textarea"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Textarea />
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <Textarea />
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<Textarea />
```

<!-- ::end:only -->

## Field

Use `Field`, `FieldLabel`, and `FieldDescription` to create a textarea with a label and description.

<!-- ::preview item="textarea-field" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Disabled

Use the `disabled` prop to disable the textarea. To style the disabled state, add the `data-disabled` attribute to the `Field` component.

<!-- ::preview item="textarea-disabled" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Invalid

Use the `aria-invalid` prop to mark the textarea as invalid. To style the invalid state, add the `data-invalid` attribute to the `Field` component.

<!-- ::preview item="textarea-invalid" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Button

Pair with `Button` to create a textarea with a submit button.

<!-- ::preview item="textarea-button" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="textarea-rtl" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" direction="rtl" -->
