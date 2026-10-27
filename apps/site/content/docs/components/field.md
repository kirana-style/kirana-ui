---
title: Field
description: Combines a label, a control and help text.
section: components
order: 9
keywords: [field, component, base, aria]
---

# Field

<!-- ::preview item="input-demo" height="360" combinations="react/base,react/aria" -->

A Field lays its parts out vertically, horizontally or by width (`orientation`), and a control inside it takes the field's width; the preview shows the Input's demo, a Field.

## Installation

With `kirana-style ui`, for every framework:

<!-- ::install exec="kirana-style ui add field" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/field" -->

## Usage

```tsx
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function Example() {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" />
      <FieldDescription>We will never share it.</FieldDescription>
    </Field>
  )
}
```

## Code

What installing it writes, in the default style, for the framework and base you choose:

<!-- ::component-code name="field" combinations="react/base,react/aria" -->
