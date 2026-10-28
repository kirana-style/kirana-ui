---
title: Input
description: A text input component for forms and user data entry with built-in styling and accessibility features.
section: components
variants: [react/base, react/aria]
keywords: [input, form, field, component, base, aria]
---

# Input

<!-- ::preview item="input-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="input" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Input } from "@/components/ui/input"
```

```tsx
<Input />
```

## Basic

<!-- ::preview item="input-basic" height="360" combinations="react/base,react/aria" -->

## Field

Use `Field`, `FieldLabel`, and `FieldDescription` to create an input with a
label and description.

<!-- ::preview item="input-field" height="360" combinations="react/base,react/aria" -->

## Field Group

Use `FieldGroup` to show multiple `Field` blocks and to build forms.

<!-- ::preview item="input-fieldgroup" height="360" combinations="react/base,react/aria" -->

## Disabled

Use the `disabled` prop to disable the input. To style the disabled state, add the `data-disabled` attribute to the `Field` component.

<!-- ::preview item="input-disabled" height="360" combinations="react/base,react/aria" -->

## Invalid

Use the `aria-invalid` prop to mark the input as invalid. To style the invalid state, add the `data-invalid` attribute to the `Field` component.

<!-- ::preview item="input-invalid" height="360" combinations="react/base,react/aria" -->

## File

Use the `type="file"` prop to create a file input.

<!-- ::preview item="input-file" height="360" combinations="react/base,react/aria" -->

## Inline

Use `Field` with `orientation="horizontal"` to create an inline input.
Pair with `Button` to create a search input with a button.

<!-- ::preview item="input-inline" height="360" combinations="react/base,react/aria" -->

## Grid

Use a grid layout to place multiple inputs side by side.

<!-- ::preview item="input-grid" height="360" combinations="react/base,react/aria" -->

## Required

Use the `required` attribute to indicate required inputs.

<!-- ::preview item="input-required" height="360" combinations="react/base,react/aria" -->

## Badge

Use `Badge` in the label to highlight a recommended field.

<!-- ::preview item="input-badge" height="360" combinations="react/base,react/aria" -->

## Input Group

To add icons, text, or buttons inside an input, use the `InputGroup` component. See the [Input Group](/docs/components/input-group) component for more examples.

<!-- ::preview item="input-input-group" height="360" combinations="react/base,react/aria" -->

## Button Group

To add buttons to an input, use the `ButtonGroup` component. See the [Button Group](/docs/components/button-group) component for more examples.

<!-- ::preview item="input-button-group" height="360" combinations="react/base,react/aria" -->

## Form

A full form example with multiple inputs, a select, and a button.

<!-- ::preview item="input-form" height="512" combinations="react/base,react/aria" -->
