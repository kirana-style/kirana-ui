---
title: Forms
description: A control with a name is submitted with its form and follows its reset; Field and Form add labels, errors and validation.
section: primitives
order: 6
keywords: [forms, field, validation, name, submit, reset, error, label]
---

# Forms

## Native forms

A control with a `name` is submitted with the form around it and follows the form's reset. It
does so through a native input it draws, so a `<form>` and `FormData` need nothing from the
library:

```tsx
<form action="/save">
  <Switch.Root name="alerts">
    <Switch.Thumb />
  </Switch.Root>
  <button type="submit">Save</button>
</form>
```

`form` names a form the control is not inside, by its id. `disabled` and `required` are the
control's props.

## Read only

`readOnly` shows a control as it is: it keeps its focus and its place in the form, its value is
submitted, and it cannot be changed. These take it, and no other component:

| Control                                                                      | Read only, it                                                        |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Checkbox, Switch, RadioGroup, Rating, NumberField, DateField, TimeField, Otp | Takes no press and no key that would change it                       |
| TagsInput, ColorPicker                                                       | Shows what it holds; no key, press or drag changes it                |
| Slider                                                                       | Moves no thumb, by key or pointer                                    |
| Select, Combobox, Autocomplete                                               | Still opens, and its list can be gone through; no item can be chosen |
| Calendar                                                                     | Its days can be moved through, and none can be chosen                |
| DatePicker                                                                   | Does not open                                                        |
| Editable                                                                     | Shows its text, and does not go into editing                         |

A read-only part has `data-readonly`, to style it.

## A group of checkboxes

[Checkbox Group](/docs/primitives/components/checkbox-group) holds the values of the checkboxes
checked inside it as one list. A checkbox marked `parent` stands for all of them: it is checked
when every one is, mixed when some are, and a press on it sets them all.

```tsx
<CheckboxGroup defaultValue={["mail"]} allValues={["mail", "push", "text"]}>
  <Checkbox.Root parent>
    <Checkbox.Indicator />
  </Checkbox.Root>
  <Checkbox.Root name="notify" value="mail">
    <Checkbox.Indicator />
  </Checkbox.Root>
  <Checkbox.Root name="notify" value="push">
    <Checkbox.Indicator />
  </Checkbox.Root>
  <Checkbox.Root name="notify" value="text">
    <Checkbox.Indicator />
  </Checkbox.Root>
</CheckboxGroup>
```

Each box is submitted under its own `name` with its `value`; the parent is not submitted.

## A label for one radio

An `id` on `RadioGroup.Item` goes on its native radio, as on Checkbox and Switch, so a label
written beside it reaches it:

```tsx
<RadioGroup.Item value="free" id="plan-free" />
<label htmlFor="plan-free">Free</label>
```

## A calendar in a form

A [Calendar](/docs/primitives/components/calendar) with a `name` is submitted through its
`Calendar.Input` part: a day; the first and the last day of a range, as two entries; each day
of a list (`mode="multiple"`).

The chosen day pressed again is taken away, and the value is `null`. With `required`, a day once
chosen stays chosen (with `mode="multiple"`, the last day cannot be taken away). `required` on a
calendar does not make a form ask for a value; on a [Date Picker](/docs/primitives/components/date-picker)
it does: inside a `Field`, an empty date picker is then invalid.

## Field

[Field](/docs/primitives/components/field) ties a control to its label, its description and its
error, and holds its validity. Inside a field, a control is the field's: it takes the field's
name, the label names it, and the parts say the field's state (`data-touched`, `data-dirty`,
`data-filled`, `data-focused`, `data-invalid`, `data-valid`).

`validate` is a check of your own, which may be asynchronous. `validationMode` says when the
field is checked: on submit (the default), on blur or on change.

## Form

[Form](/docs/primitives/components/form) checks its fields when it is submitted and moves focus to
the first that is wrong. `errors` takes what a server refused, by field name, and each field shows
its own until it changes. `onFormSubmit` gives the values as an object when every field is valid,
and the page is not left.

[Fieldset](/docs/primitives/components/fieldset) groups fields under a legend, and can disable
them together.
