---
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
section: components
variants: [react/base, react/aria]
keywords: [checkbox, form, field, component, base, aria]
---

# Checkbox

<!-- ::preview item="checkbox-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="checkbox" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

```tsx
<Checkbox />
```

## Checked State

<!-- ::start:only react/base -->

Use `defaultChecked` for uncontrolled checkboxes, or `checked` and
`onCheckedChange` to control the state.

```tsx
import * as React from "react"

export function Example() {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox checked={checked} onCheckedChange={setChecked} />
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `defaultSelected` for uncontrolled checkboxes, or `isSelected` and
`onChange` to control the state.

```tsx
import * as React from "react"

export function Example() {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox isSelected={checked} onChange={setChecked} />
}
```

<!-- ::end:only -->

## Invalid State

<!-- ::start:only react/base -->

Set `aria-invalid` on the checkbox and `data-invalid` on the field wrapper to
show the invalid styles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Set `isInvalid` on the checkbox and `data-invalid` on the field wrapper to
show the invalid styles.

<!-- ::end:only -->

<!-- ::preview item="checkbox-invalid" height="360" combinations="react/base,react/aria" -->

## Basic

Pair the checkbox with `Field` and `FieldLabel` for proper layout and labeling.

<!-- ::preview item="checkbox-basic" height="360" combinations="react/base,react/aria" -->

## Description

Use `FieldContent` and `FieldDescription` for helper text.

<!-- ::preview item="checkbox-description" height="360" combinations="react/base,react/aria" -->

## Disabled

<!-- ::start:only react/base -->

Use the `disabled` prop to prevent interaction and add the `data-disabled` attribute to the `<Field>` component for disabled styles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `isDisabled` prop to prevent interaction and add the `data-disabled` attribute to the `<Field>` component for disabled styles.

<!-- ::end:only -->

<!-- ::preview item="checkbox-disabled" height="360" combinations="react/base,react/aria" -->

## Group

Use multiple fields to create a checkbox list.

<!-- ::preview item="checkbox-group" height="360" combinations="react/base,react/aria" -->

## Table

<!-- ::preview item="checkbox-table" height="360" combinations="react/base,react/aria" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI](https://base-ui.com/react/components/checkbox#api-reference) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/Checkbox#api) documentation for more information.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
