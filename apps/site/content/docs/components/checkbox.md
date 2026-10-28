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

With `kirana-style ui`:

<!-- ::install exec="kirana-style ui add checkbox" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/checkbox" -->

## Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox"

export function Example() {
  return <Checkbox />
}
```

## Checked state

<!-- ::start:tabs -->

### Base UI

Use `defaultChecked` for an uncontrolled checkbox, or `checked` and
`onCheckedChange` to control it.

```tsx
import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"

export function Example() {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox checked={checked} onCheckedChange={setChecked} />
}
```

### React Aria

Use `defaultSelected` for an uncontrolled checkbox, or `isSelected` and
`onChange` to control it.

```tsx
import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"

export function Example() {
  const [selected, setSelected] = React.useState(false)

  return <Checkbox isSelected={selected} onChange={setSelected} />
}
```

<!-- ::end:tabs -->

## Invalid state

<!-- ::start:only react/base -->

Set `aria-invalid` on the checkbox and `data-invalid` on the `Field` around it
to show the invalid styles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Set `isInvalid` on the checkbox and `data-invalid` on the `Field` around it to
show the invalid styles.

<!-- ::end:only -->

<!-- ::preview item="checkbox-invalid" height="240" combinations="react/base,react/aria" -->

## Basic

Pair the checkbox with `Field` and `FieldLabel` for its layout and its label.

<!-- ::preview item="checkbox-basic" height="240" combinations="react/base,react/aria" -->

## Description

Use `FieldContent` and `FieldDescription` for help text.

<!-- ::preview item="checkbox-description" height="240" combinations="react/base,react/aria" -->

## Disabled

<!-- ::start:only react/base -->

Use the `disabled` prop to prevent interaction, and add `data-disabled` to the
`Field` for its disabled styles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `isDisabled` prop to prevent interaction, and add `data-disabled` to the
`Field` for its disabled styles.

<!-- ::end:only -->

<!-- ::preview item="checkbox-disabled" height="240" combinations="react/base,react/aria" -->

## Group

Use several fields for a list of checkboxes.

<!-- ::preview item="checkbox-group" height="360" combinations="react/base,react/aria" -->

## Table

<!-- ::start:only react/aria -->

In React Aria's `Table`, a checkbox with `slot="selection"` selects its row, or
every row from the header, when the table has a `selectionMode`.

<!-- ::end:only -->

<!-- ::preview item="checkbox-table" height="360" combinations="react/base,react/aria" -->

## Code

What installing it writes, in the default style:

<!-- ::component-code name="checkbox" combinations="react/base,react/aria" -->
