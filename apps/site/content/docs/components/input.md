---
title: Input
description: A text input component for forms and user data entry with built-in styling and accessibility features.
section: components
variants:
  [react/base, react/aria, vue/ark, vue/reka, svelte/ark, solid/ark, angular/ng]
keywords:
  [input, form, field, component, base, aria, ark, vue, svelte, solid, angular]
---

# Input

<!-- ::preview item="input-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="input" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Usage

```tsx
import { Input } from "@/components/ui/input"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Input />
```

<!-- ::end:only -->

<!-- ::start:only vue/ark,vue/reka -->

```vue
<template>
  <Input />
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<Input />
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
<Input />
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { Input } from "@/components/ui/input"

@Component({
  selector: "app-example",
  imports: [Input],
  template: ` <input kuiInput /> `,
})
export class Example {}
```

<!-- ::end:only -->

## Basic

<!-- ::preview item="input-basic" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Field

Use `Field`, `FieldLabel`, and `FieldDescription` to create an input with a
label and description.

<!-- ::preview item="input-field" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Field Group

Use `FieldGroup` to show multiple `Field` blocks and to build forms.

<!-- ::preview item="input-fieldgroup" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Disabled

Use the `disabled` prop to disable the input. To style the disabled state, add the `data-disabled` attribute to the `Field` component.

<!-- ::preview item="input-disabled" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Invalid

Use the `aria-invalid` prop to mark the input as invalid. To style the invalid state, add the `data-invalid` attribute to the `Field` component.

<!-- ::preview item="input-invalid" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## File

Use the `type="file"` prop to create a file input.

<!-- ::preview item="input-file" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Inline

Use `Field` with `orientation="horizontal"` to create an inline input.
Pair with `Button` to create a search input with a button.

<!-- ::preview item="input-inline" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Grid

Use a grid layout to place multiple inputs side by side.

<!-- ::preview item="input-grid" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Required

Use the `required` attribute to indicate required inputs.

<!-- ::preview item="input-required" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Badge

Use `Badge` in the label to highlight a recommended field.

<!-- ::preview item="input-badge" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Input Group

To add icons, text, or buttons inside an input, use the `InputGroup` component. See the [Input Group](/docs/components/input-group) component for more examples.

<!-- ::preview item="input-input-group" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Button Group

To add buttons to an input, use the `ButtonGroup` component. See the [Button Group](/docs/components/button-group) component for more examples.

<!-- ::preview item="input-button-group" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Form

A full form example with multiple inputs, a select, and a button.

<!-- ::preview item="input-form" height="512" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="input-rtl" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" direction="rtl" -->
