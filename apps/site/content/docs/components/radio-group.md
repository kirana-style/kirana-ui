---
title: Radio Group
description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
section: components
variants: [react/base, react/aria]
keywords: [radio, radio group, form, field, component, base, aria]
---

# Radio Group

<!-- ::preview item="radio-group-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="radio-group" combinations="react/base,react/aria" -->

## Usage

```tsx
import { css } from "@kirana-style/core"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const styles = {
  option: css({ display: "flex", alignItems: "center", gap: "0.75rem" }),
}
```

```tsx
<RadioGroup defaultValue="option-one">
  <div sx={styles.option}>
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div sx={styles.option}>
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
```

## Composition

Use the following composition to build a `RadioGroup`:

```text
RadioGroup
├── RadioGroupItem
└── RadioGroupItem
```

## Description

Radio group items with a description using the `Field` component.

<!-- ::preview item="radio-group-description" height="360" combinations="react/base,react/aria" -->

## Choice Card

Use `FieldLabel` to wrap the entire `Field` for a clickable card-style selection.

<!-- ::preview item="radio-group-choice-card" height="360" combinations="react/base,react/aria" -->

## Fieldset

Use `FieldSet` and `FieldLegend` to group radio items with a label and description.

<!-- ::preview item="radio-group-fieldset" height="360" combinations="react/base,react/aria" -->

## Disabled

<!-- ::start:only react/base -->

Use the `disabled` prop on `RadioGroup` to disable all items.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `isDisabled` prop on `RadioGroup` to disable all items.

<!-- ::end:only -->

<!-- ::preview item="radio-group-disabled" height="360" combinations="react/base,react/aria" -->

## Invalid

<!-- ::start:only react/base -->

Use `aria-invalid` on `RadioGroupItem` and `data-invalid` on `Field` to show validation errors.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `isInvalid` on `RadioGroupItem` and `data-invalid` on `Field` to show validation errors.

<!-- ::end:only -->

<!-- ::preview item="radio-group-invalid" height="360" combinations="react/base,react/aria" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Radio Group](https://base-ui.com/react/components/radio-group#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Radio Group](https://react-aria.adobe.com/RadioGroup#api) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
