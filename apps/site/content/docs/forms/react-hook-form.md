---
title: React Hook Form
description: Build forms in React using React Hook Form and Zod.
section: forms
order: 1
variants: [react/base, react/aria]
keywords: [react hook form, forms, zod, validation, field]
---

# React Hook Form

In this guide, we will take a look at building forms with React Hook Form. We'll cover building forms with the `<Field />` component, adding schema validation using Zod, error handling, accessibility, and more.

## Demo

We are going to build the following form. It has a simple text input and a textarea. On submit, we'll validate the form data and display any errors.

> [!NOTE]
> **Note:** For the purpose of this demo, we have intentionally disabled browser validation to show how schema validation and form errors work in React Hook Form. It is recommended to add basic browser validation in your production code.

<!-- ::preview item="form-rhf-demo" height="700" combinations="react/base,react/aria" -->

## Approach

This form leverages React Hook Form for performant, flexible form handling. We'll build our form using the `<Field />` component, which gives you **complete flexibility over the markup and styling**.

- Uses React Hook Form's `useForm` hook for form state management.
- `<Controller />` component for controlled inputs.
- `<Field />` components for building accessible forms.
- Client-side validation using Zod with `zodResolver`.

## Anatomy

Here's a basic example of a form using the `<Controller />` component from React Hook Form and the `<Field />` component.

```tsx showLineNumbers {5-18}
<Controller
  name="title"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Login button not working on mobile"
        autoComplete="off"
      />
      <FieldDescription>
        Provide a concise title for your bug report.
      </FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

## Form

### Create a form schema

We'll start by defining the shape of our form using a Zod schema.

> [!NOTE]
> **Note:** This example uses Zod 4 for schema validation, but you can replace it with any other Standard Schema validation library supported by React Hook Form.

```tsx showLineNumbers title="form.tsx"
import * as z from "zod"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})
```

### Set up the form

Next, we'll use the `useForm` hook from React Hook Form to create our form instance. We'll also add the Zod resolver to validate the form data.

```tsx showLineNumbers title="form.tsx" {17-23}
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

export function BugReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* ... */}
      {/* Build the form here */}
      {/* ... */}
    </form>
  )
}
```

### Build the form

We can now build the form using the `<Controller />` component from React Hook Form and the `<Field />` component.

<!-- ::demo-source item="form-rhf-demo" title="form.tsx" combinations="react/base,react/aria" -->

### Done

That's it. You now have a fully accessible form with client-side validation.

When you submit the form, the `onSubmit` function will be called with the validated form data. If the form data is invalid, React Hook Form will display the errors next to each field.

## Validation

### Client-side Validation

React Hook Form validates your form data using the Zod schema. Define a schema and pass it to the `resolver` option of the `useForm` hook.

```tsx showLineNumbers title="example-form.tsx" {5-8,12}
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
})

export function ExampleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })
}
```

### Validation Modes

React Hook Form supports different validation modes.

```tsx showLineNumbers title="form.tsx" {3}
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  mode: "onChange",
})
```

| Mode          | Description                                              |
| ------------- | -------------------------------------------------------- |
| `"onChange"`  | Validation triggers on every change.                     |
| `"onBlur"`    | Validation triggers on blur.                             |
| `"onSubmit"`  | Validation triggers on submit (default).                 |
| `"onTouched"` | Validation triggers on first blur, then on every change. |
| `"all"`       | Validation triggers on blur and change.                  |

## Displaying Errors

Display errors next to the field using `<FieldError />`. For styling and accessibility:

- Add the `data-invalid` prop to the `<Field />` component.
- Add the `aria-invalid` prop to the form control such as `<Input />`, `<SelectTrigger />`, `<Checkbox />`, etc.

```tsx showLineNumbers title="form.tsx" {5,11,13}
<Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
      <Input
        {...field}
        id={field.name}
        type="email"
        aria-invalid={fieldState.invalid}
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

## Working with Different Field Types

### Input

- For input fields, spread the `field` object onto the `<Input />` component.
- To show errors, add the `aria-invalid` prop to the `<Input />` component and the `data-invalid` prop to the `<Field />` component.

<!-- ::preview item="form-rhf-input" height="700" combinations="react/base,react/aria" -->

For simple text inputs, spread the `field` object onto the input.

```tsx showLineNumbers title="form.tsx" {5,7,8}
<Controller
  name="name"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
      <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

### Textarea

- For textarea fields, spread the `field` object onto the `<Textarea />` component.
- To show errors, add the `aria-invalid` prop to the `<Textarea />` component and the `data-invalid` prop to the `<Field />` component.

<!-- ::preview item="form-rhf-textarea" height="700" combinations="react/base,react/aria" -->

For textarea fields, spread the `field` object onto the textarea.

```tsx showLineNumbers title="form.tsx" {5,10,18}
const styles = {
  about: css({ minHeight: { "*": null, base: "120px" } }),
}

<Controller
  name="about"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="form-rhf-textarea-about">More about you</FieldLabel>
      <Textarea
        {...field}
        id="form-rhf-textarea-about"
        aria-invalid={fieldState.invalid}
        placeholder="I'm a software engineer..."
        sx={styles.about}
      />
      <FieldDescription>
        Tell us more about yourself. This will be used to help us personalize
        your experience.
      </FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

### Select

<!-- ::start:only react/base -->

- For select components, use `field.value` and `field.onChange` on the `<Select />` component.
- To show errors, add the `aria-invalid` prop to the `<SelectTrigger />` component and the `data-invalid` prop to the `<Field />` component.
- Give the `<Select />` its `items`, each value's label, which Base UI's trigger shows.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

- For select components, use `field.value` and `field.onChange` on the `<Select />` component, as its `value` and `onChange`. Its `placeholder` is the select's.
- To show errors, add the `aria-invalid` prop to the `<SelectTrigger />` component and the `data-invalid` prop to the `<Field />` component.

<!-- ::end:only -->

<!-- ::preview item="form-rhf-select" height="500" combinations="react/base,react/aria" -->

<!-- ::start:only react/base -->

```tsx showLineNumbers title="form.tsx"
const styles = {
  trigger: css({ minWidth: "120px" }),
}

// What the trigger shows for each value: Base UI's select reads it from `items`.
const items = [
  { label: "Auto", value: "auto" },
  { label: "English", value: "en" },
]

<Controller
  name="language"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field orientation="responsive" data-invalid={fieldState.invalid}>
      <FieldContent>
        <FieldLabel htmlFor="form-rhf-select-language">
          Spoken Language
        </FieldLabel>
        <FieldDescription>
          For best results, select the language you speak.
        </FieldDescription>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
      <Select
        items={items}
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger
          id="form-rhf-select-language"
          aria-invalid={fieldState.invalid}
          sx={styles.trigger}
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">Auto</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  )}
/>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="form.tsx"
const styles = {
  trigger: css({ minWidth: "120px" }),
}

<Controller
  name="language"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field orientation="responsive" data-invalid={fieldState.invalid}>
      <FieldContent>
        <FieldLabel htmlFor="form-rhf-select-language">
          Spoken Language
        </FieldLabel>
        <FieldDescription>
          For best results, select the language you speak.
        </FieldDescription>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
      <Select
        placeholder="Select"
        name={field.name}
        value={field.value}
        onChange={field.onChange}
      >
        <SelectTrigger
          id="form-rhf-select-language"
          aria-invalid={fieldState.invalid}
          sx={styles.trigger}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem id="auto">Auto</SelectItem>
          <SelectItem id="en">English</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  )}
/>
```

<!-- ::end:only -->

### Checkbox

<!-- ::start:only react/base -->

- For checkbox arrays, use `field.value` and `field.onChange` with array manipulation.
- To show errors, add the `aria-invalid` prop to the `<Checkbox />` component and the `data-invalid` prop to the `<Field />` component.
- Remember to add `data-slot="checkbox-group"` to the `<FieldGroup />` component for proper styling and spacing.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

- For checkbox arrays, use `field.value` and `field.onChange` with array manipulation, through each `<Checkbox />`'s `isSelected` and `onChange`.
- To show errors, add the `isInvalid` prop to the `<Checkbox />` component and the `data-invalid` prop to the `<Field />` component.
- Remember to add `data-slot="checkbox-group"` to the `<FieldGroup />` component for proper styling and spacing.

<!-- ::end:only -->

<!-- ::preview item="form-rhf-checkbox" height="700" combinations="react/base,react/aria" -->

<!-- ::start:only react/base -->

```tsx showLineNumbers title="form.tsx"
const styles = {
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
}

<Controller
  name="tasks"
  control={form.control}
  render={({ field, fieldState }) => (
    <FieldSet>
      <FieldLegend variant="label">Tasks</FieldLegend>
      <FieldDescription>
        Get notified when tasks you&apos;ve created have updates.
      </FieldDescription>
      <FieldGroup data-slot="checkbox-group">
        {tasks.map((task) => (
          <Field
            key={task.id}
            orientation="horizontal"
            data-invalid={fieldState.invalid}
          >
            <Checkbox
              id={`form-rhf-checkbox-${task.id}`}
              name={field.name}
              aria-invalid={fieldState.invalid}
              checked={field.value.includes(task.id)}
              onCheckedChange={(checked) => {
                const newValue = checked
                  ? [...field.value, task.id]
                  : field.value.filter((value) => value !== task.id)
                field.onChange(newValue)
              }}
            />
            <FieldLabel
              htmlFor={`form-rhf-checkbox-${task.id}`}
              sx={styles.normal}
            >
              {task.label}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </FieldSet>
  )}
/>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="form.tsx"
const styles = {
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
}

<Controller
  name="tasks"
  control={form.control}
  render={({ field, fieldState }) => (
    <FieldSet>
      <FieldLegend variant="label">Tasks</FieldLegend>
      <FieldDescription>
        Get notified when tasks you&apos;ve created have updates.
      </FieldDescription>
      <FieldGroup data-slot="checkbox-group">
        {tasks.map((task) => (
          <Field
            key={task.id}
            orientation="horizontal"
            data-invalid={fieldState.invalid}
          >
            <Checkbox
              id={`form-rhf-checkbox-${task.id}`}
              name={field.name}
              isInvalid={fieldState.invalid}
              isSelected={field.value.includes(task.id)}
              onChange={(checked: boolean) => {
                const newValue = checked
                  ? [...field.value, task.id]
                  : field.value.filter((value) => value !== task.id)
                field.onChange(newValue)
              }}
            />
            <FieldLabel
              htmlFor={`form-rhf-checkbox-${task.id}`}
              sx={styles.normal}
            >
              {task.label}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </FieldSet>
  )}
/>
```

<!-- ::end:only -->

### Radio Group

<!-- ::start:only react/base -->

- For radio groups, use `field.value` and `field.onChange` on the `<RadioGroup />` component.
- To show errors, add the `aria-invalid` prop to the `<RadioGroupItem />` component and the `data-invalid` prop to the `<Field />` component.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

- For radio groups, use `field.value` and `field.onChange` on the `<RadioGroup />` component.
- To show errors, add the `aria-invalid` prop to the `<RadioGroupItem />` component and the `data-invalid` prop to the `<Field />` component.

<!-- ::end:only -->

<!-- ::preview item="form-rhf-radiogroup" height="700" combinations="react/base,react/aria" -->

<!-- ::start:only react/base -->

```tsx showLineNumbers title="form.tsx" {12-13,17,25,31}
<Controller
  name="plan"
  control={form.control}
  render={({ field, fieldState }) => (
    <FieldSet>
      <FieldLegend>Plan</FieldLegend>
      <FieldDescription>
        You can upgrade or downgrade your plan at any time.
      </FieldDescription>
      <RadioGroup
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
      >
        {plans.map((plan) => (
          <FieldLabel key={plan.id} htmlFor={`form-rhf-radiogroup-${plan.id}`}>
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldTitle>{plan.title}</FieldTitle>
                <FieldDescription>{plan.description}</FieldDescription>
              </FieldContent>
              <RadioGroupItem
                value={plan.id}
                id={`form-rhf-radiogroup-${plan.id}`}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </FieldSet>
  )}
/>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="form.tsx" {12-13,17,25,31}
<Controller
  name="plan"
  control={form.control}
  render={({ field, fieldState }) => (
    <FieldSet>
      <FieldLegend>Plan</FieldLegend>
      <FieldDescription>
        You can upgrade or downgrade your plan at any time.
      </FieldDescription>
      <RadioGroup
        name={field.name}
        value={field.value}
        onChange={field.onChange}
      >
        {plans.map((plan) => (
          <FieldLabel key={plan.id} htmlFor={`form-rhf-radiogroup-${plan.id}`}>
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldTitle>{plan.title}</FieldTitle>
                <FieldDescription>{plan.description}</FieldDescription>
              </FieldContent>
              <RadioGroupItem
                value={plan.id}
                id={`form-rhf-radiogroup-${plan.id}`}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </FieldSet>
  )}
/>
```

<!-- ::end:only -->

### Switch

<!-- ::start:only react/base -->

- For switches, use `field.value` and `field.onChange` on the `<Switch />` component.
- To show errors, add the `aria-invalid` prop to the `<Switch />` component and the `data-invalid` prop to the `<Field />` component.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

- For switches, use `field.value` and `field.onChange` on the `<Switch />` component, as its `isSelected` and `onChange`.
- React Aria's switch has no invalid state: to show errors, add the `data-invalid` prop to the `<Field />` component.

<!-- ::end:only -->

<!-- ::preview item="form-rhf-switch" height="500" combinations="react/base,react/aria" -->

<!-- ::start:only react/base -->

```tsx showLineNumbers title="form.tsx" {5,13,18-19}
<Controller
  name="twoFactor"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
      <FieldContent>
        <FieldLabel htmlFor="form-rhf-switch-twoFactor">
          Multi-factor authentication
        </FieldLabel>
        <FieldDescription>
          Enable multi-factor authentication to secure your account.
        </FieldDescription>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
      <Switch
        id="form-rhf-switch-twoFactor"
        name={field.name}
        checked={field.value}
        onCheckedChange={field.onChange}
        aria-invalid={fieldState.invalid}
      />
    </Field>
  )}
/>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="form.tsx"
<Controller
  name="twoFactor"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
      <FieldContent>
        <FieldLabel htmlFor="form-rhf-switch-twoFactor">
          Multi-factor authentication
        </FieldLabel>
        <FieldDescription>
          Enable multi-factor authentication to secure your account.
        </FieldDescription>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
      <Switch
        id="form-rhf-switch-twoFactor"
        name={field.name}
        isSelected={field.value}
        onChange={field.onChange}
      />
    </Field>
  )}
/>
```

<!-- ::end:only -->

### Complex Forms

Here is an example of a more complex form with multiple fields and validation.

<!-- ::preview item="form-rhf-complex" height="1300" combinations="react/base,react/aria" -->

## Resetting the Form

Use `form.reset()` to reset the form to its default values.

```tsx showLineNumbers
<Button type="button" variant="outline" onClick={() => form.reset()}>
  Reset
</Button>
```

## Array Fields

React Hook Form provides a `useFieldArray` hook for managing dynamic array fields. This is useful when you need to add or remove fields dynamically.

<!-- ::preview item="form-rhf-array" height="700" combinations="react/base,react/aria" -->

### Using useFieldArray

Use the `useFieldArray` hook to manage array fields. It provides `fields`, `append`, and `remove` methods.

```tsx showLineNumbers title="form.tsx" {8-11}
import { useFieldArray, useForm } from "react-hook-form"

export function ExampleForm() {
  const form = useForm({
    // ... form config
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
  })
}
```

### Array Field Structure

Wrap your array fields in a `<FieldSet />` with a `<FieldLegend />` and `<FieldDescription />`.

```tsx showLineNumbers title="form.tsx"
const styles = {
  options: css({ gap: { "*": null, base: space[4] } }),
}

<FieldSet sx={styles.options}>
  <FieldLegend variant="label">Email Addresses</FieldLegend>
  <FieldDescription>
    Add up to 5 email addresses where we can contact you.
  </FieldDescription>
  <FieldGroup sx={styles.options}>{/* Array items go here */}</FieldGroup>
</FieldSet>
```

### Controller Pattern for Array Items

Map over the `fields` array and use `<Controller />` for each item. **Make sure to use `field.id` as the key**.

```tsx showLineNumbers title="form.tsx"
{
  fields.map((field, index) => (
    <Controller
      key={field.id}
      name={`emails.${index}.address`}
      control={form.control}
      render={({ field: controllerField, fieldState }) => (
        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
          <FieldContent>
            <InputGroup>
              <InputGroupInput
                {...controllerField}
                id={`form-rhf-array-email-${index}`}
                aria-invalid={fieldState.invalid}
                placeholder="name@example.com"
                type="email"
                autoComplete="email"
              />
              {/* Remove button */}
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
        </Field>
      )}
    />
  ))
}
```

### Adding Items

Use the `append` method to add new items to the array.

```tsx showLineNumbers title="form.tsx"
<Button
  type="button"
  variant="outline"
  size="sm"
  onClick={() => append({ address: "" })}
  disabled={fields.length >= 5}
>
  Add Email Address
</Button>
```

### Removing Items

Use the `remove` method to remove items from the array. Add the remove button conditionally.

```tsx showLineNumbers title="form.tsx"
{
  fields.length > 1 && (
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={() => remove(index)}
        aria-label={`Remove email ${index + 1}`}
      >
        <XIcon />
      </InputGroupButton>
    </InputGroupAddon>
  )
}
```

### Array Validation

Use Zod's `array` method to validate array fields.

```tsx showLineNumbers title="form.tsx"
const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Enter a valid email address."),
      })
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
})
```
