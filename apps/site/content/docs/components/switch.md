---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
section: components
variants: [react/base, react/aria]
keywords: [switch, toggle, form, field, component, base, aria]
---

# Switch

<!-- ::preview item="switch-demo" height="260" combinations="react/base,react/aria" -->

## Installation

With `kirana-style ui`:

<!-- ::install exec="kirana-style ui add switch" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/switch" -->

## Usage

```tsx
import { Switch } from "@/components/ui/switch"

export function Example() {
  return <Switch />
}
```

## Description

<!-- ::preview item="switch-description" height="280" combinations="react/base,react/aria" -->

## Choice card

A card that toggles on a click: `FieldLabel` wraps the whole `Field`.

<!-- ::preview item="switch-choice-card" height="320" combinations="react/base,react/aria" -->

## Disabled

<!-- ::start:only react/base -->

Add the `disabled` prop to the `Switch` to disable it, and `data-disabled` to
the `Field` for its styles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Add the `isDisabled` prop to the `Switch` to disable it, and `data-disabled` to
the `Field` for its styles.

<!-- ::end:only -->

<!-- ::preview item="switch-disabled" height="260" combinations="react/base,react/aria" -->

## Invalid

<!-- ::start:only react/base -->

Add `aria-invalid` to the `Switch` to mark it invalid, and `data-invalid` to the
`Field` for its styles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

React Aria's `Switch` has no invalid state of its own: add `data-invalid` to the
`Switch` for its styles, and to the `Field` for the label's.

<!-- ::end:only -->

<!-- ::preview item="switch-invalid" height="280" combinations="react/base,react/aria" -->

## Size

Use the `size` prop to change the size of the switch: `default` or `sm`.

<!-- ::preview item="switch-sizes" height="260" combinations="react/base,react/aria" -->

## Code

What installing it writes, in the default style:

<!-- ::component-code name="switch" combinations="react/base,react/aria" -->
