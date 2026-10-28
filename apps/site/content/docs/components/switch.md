---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
section: components
variants: [react/base, react/aria]
keywords: [switch, toggle, form, field, component, base, aria]
---

# Switch

<!-- ::preview item="switch-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="switch" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Switch } from "@/components/ui/switch"
```

```tsx
<Switch />
```

## Description

<!-- ::preview item="switch-description" height="360" combinations="react/base,react/aria" -->

## Choice Card

Card-style selection where `FieldLabel` wraps the entire `Field` for a clickable card pattern.

<!-- ::preview item="switch-choice-card" height="360" combinations="react/base,react/aria" -->

## Disabled

<!-- ::start:only react/base -->

Add the `disabled` prop to the `Switch` component to disable the switch. Add the `data-disabled` prop to the `Field` component for styling.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Add the `isDisabled` prop to the `Switch` component to disable the switch. Add the `data-disabled` prop to the `Field` component for styling.

<!-- ::end:only -->

<!-- ::preview item="switch-disabled" height="360" combinations="react/base,react/aria" -->

## Invalid

<!-- ::start:only react/base -->

Add the `aria-invalid` prop to the `Switch` component to indicate an invalid state. Add the `data-invalid` prop to the `Field` component for styling.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Add the `data-invalid` prop to the `Switch` component to indicate an invalid state. Add the `data-invalid` prop to the `Field` component for styling.

<!-- ::end:only -->

<!-- ::preview item="switch-invalid" height="360" combinations="react/base,react/aria" -->

## Size

Use the `size` prop to change the size of the switch.

<!-- ::preview item="switch-sizes" height="360" combinations="react/base,react/aria" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Switch](https://base-ui.com/react/components/switch#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Switch](https://react-aria.adobe.com/Switch#api) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
