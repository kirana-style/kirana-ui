---
title: Label
description: Renders an accessible label associated with controls.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark]
keywords: [label, form, field, component, base, aria, ark, vue, svelte]
---

# Label

<!-- ::preview item="label-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

> [!NOTE]
> For form fields, use the [Field](/docs/components/field) component, which
> includes a built-in label, description and error handling.

## Installation

<!-- ::installation name="label" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Usage

```tsx
import { Label } from "@/components/ui/label"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Label htmlFor="email">Your email address</Label>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <Label for="email">Your email address</Label>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<Label for="email">Your email address</Label>
```

<!-- ::end:only -->

## Label in Field

For form fields, use the [Field](/docs/components/field) component which
includes built-in `FieldLabel`, `FieldDescription`, and `FieldError` components.

```tsx
<Field>
  <FieldLabel htmlFor="email">Your email address</FieldLabel>
  <Input id="email" />
</Field>
```

<!-- ::preview item="field-demo" height="760" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="label-rtl" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Label](https://base-ui.com/react/components/label#api-reference) documentation for more information.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
