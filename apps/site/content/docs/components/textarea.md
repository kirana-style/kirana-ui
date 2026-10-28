---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
section: components
variants: [react/base, react/aria]
keywords: [textarea, input, form, component, base, aria]
---

# Textarea

<!-- ::preview item="textarea-demo" height="300" combinations="react/base,react/aria" -->

## Installation

With `kirana-style ui`:

<!-- ::install exec="kirana-style ui add textarea" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/textarea" -->

## Usage

```tsx
import { Textarea } from "@/components/ui/textarea"

export function Example() {
  return <Textarea placeholder="Type your message here." />
}
```

The textarea grows with what is typed in it (`field-sizing: content`), from
four lines' height.

## Field

Use `Field`, `FieldLabel` and `FieldDescription` to give the textarea a label and
a description.

<!-- ::preview item="textarea-field" height="300" combinations="react/base,react/aria" -->

## Disabled

Use the `disabled` prop to disable the textarea. To style the field it sits in as
disabled too, add `data-disabled` to the `Field`.

<!-- ::preview item="textarea-disabled" height="300" combinations="react/base,react/aria" -->

## Invalid

Use the `aria-invalid` prop to mark the textarea as invalid. To style the field
it sits in as invalid too, add `data-invalid` to the `Field`.

<!-- ::preview item="textarea-invalid" height="300" combinations="react/base,react/aria" -->

## Button

Pair it with `Button` for a textarea with a submit button.

<!-- ::preview item="textarea-button" height="300" combinations="react/base,react/aria" -->

## Code

What installing it writes, in the default style:

<!-- ::component-code name="textarea" combinations="react/base,react/aria" -->
