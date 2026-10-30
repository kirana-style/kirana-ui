---
title: Label
description: Renders an accessible label associated with controls.
section: components
variants: [react/base, react/aria]
keywords: [label, form, field, component, base, aria]
---

# Label

<!-- ::preview item="label-demo" height="360" combinations="react/base,react/aria" -->

> [!NOTE]
> For form fields, use the [Field](/docs/components/field) component, which
> includes a built-in label, description and error handling.

## Installation

<!-- ::installation name="label" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Label } from "@/components/ui/label"
```

```tsx
<Label htmlFor="email">Your email address</Label>
```

## Label in Field

For form fields, use the [Field](/docs/components/field) component which
includes built-in `FieldLabel`, `FieldDescription`, and `FieldError` components.

```tsx
<Field>
  <FieldLabel htmlFor="email">Your email address</FieldLabel>
  <Input id="email" />
</Field>
```

<!-- ::preview item="field-demo" height="704" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="label-rtl" height="360" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Label](https://base-ui.com/react/components/label#api-reference) documentation for more information.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
