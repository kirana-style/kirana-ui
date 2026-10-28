---
title: Radio Group
description: A set of checkable buttons, known as radio buttons, where no more than one can be checked at a time.
section: components
variants: [react/base, react/aria]
keywords: [radio, radio group, form, field, component, base, aria]
---

# Radio Group

<!-- ::preview item="radio-group-demo" height="300" combinations="react/base,react/aria" -->

## Installation

With `kirana-style ui`:

<!-- ::install exec="kirana-style ui add radio-group" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/radio-group" -->

## Usage

```tsx
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function Example() {
  return (
    <RadioGroup defaultValue="option-one">
      <div>
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div>
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  )
}
```

## Description

Radio group items with a description, using the `Field` component.

<!-- ::preview item="radio-group-description" height="320" combinations="react/base,react/aria" -->

## Choice card

Use `FieldLabel` to wrap the whole `Field` for a card that selects on a click.

<!-- ::preview item="radio-group-choice-card" height="320" combinations="react/base,react/aria" -->

## Fieldset

Use `FieldSet` and `FieldLegend` to group radio items with a label and a
description.

<!-- ::preview item="radio-group-fieldset" height="320" combinations="react/base,react/aria" -->

## Disabled

<!-- ::start:only react/base -->

Use the `disabled` prop on `RadioGroup` to disable every item.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `isDisabled` prop on `RadioGroup` to disable every item, or on a
`RadioGroupItem` to disable one.

<!-- ::end:only -->

<!-- ::preview item="radio-group-disabled" height="280" combinations="react/base,react/aria" -->

## Invalid

<!-- ::start:only react/base -->

Use `aria-invalid` on `RadioGroupItem` and `data-invalid` on `Field` to show
validation errors.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `isInvalid` on `RadioGroup` and `data-invalid` on `Field` to show
validation errors.

<!-- ::end:only -->

<!-- ::preview item="radio-group-invalid" height="320" combinations="react/base,react/aria" -->

## Code

What installing it writes, in the default style:

<!-- ::component-code name="radio-group" combinations="react/base,react/aria" -->
