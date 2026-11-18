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
control's props. `readOnly` is a prop of Checkbox, Switch, RadioGroup, NumberField, DateField,
DatePicker and Calendar; Select, Combobox and Slider have none.

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
