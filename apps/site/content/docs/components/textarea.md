---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
section: components
variants: [react/base, react/aria]
keywords: [textarea, input, form, component, base, aria]
---

# Textarea

<!-- ::preview item="textarea-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="textarea" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Textarea } from "@/components/ui/textarea"
```

```tsx
<Textarea />
```

## Field

Use `Field`, `FieldLabel`, and `FieldDescription` to create a textarea with a label and description.

<!-- ::preview item="textarea-field" height="360" combinations="react/base,react/aria" -->

## Disabled

Use the `disabled` prop to disable the textarea. To style the disabled state, add the `data-disabled` attribute to the `Field` component.

<!-- ::preview item="textarea-disabled" height="360" combinations="react/base,react/aria" -->

## Invalid

Use the `aria-invalid` prop to mark the textarea as invalid. To style the invalid state, add the `data-invalid` attribute to the `Field` component.

<!-- ::preview item="textarea-invalid" height="360" combinations="react/base,react/aria" -->

## Button

Pair with `Button` to create a textarea with a submit button.

<!-- ::preview item="textarea-button" height="360" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="textarea-rtl" height="360" combinations="react/base,react/aria" direction="rtl" -->
