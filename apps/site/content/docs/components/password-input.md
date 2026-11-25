---
title: Password Input
description: An input for a password, with a button that shows what is typed, built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords:
  [password, input, show, hide, reveal, form, component, kirana, primitives]
---

# Password Input

<!-- ::preview item="password-input-demo" height="360" combinations="react/kirana" -->

Password Input is built on the [Password Input primitive](/docs/primitives/components/password-input) of Kirana UI Primitives. It looks like an [Input](/docs/components/input) and draws its own show/hide button at its inline end: an eye, struck through while the password can be read. A press on the button leaves focus and the caret in the input, and the password is hidden again when its form is sent or reset.

## Installation

<!-- ::installation name="password-input" combinations="react/kirana" -->

## Usage

```tsx
import { PasswordInput } from "@/components/ui/password-input"
```

```tsx
<PasswordInput autoComplete="current-password" aria-label="Password" />
```

## Examples

### Disabled

Use `disabled` to stop anything being typed and the password being shown.

<!-- ::preview item="password-input-disabled" height="360" combinations="react/kirana" -->

### In a form

In a `Field`, with a description and a check run when the form is sent: the input takes `aria-invalid` while the password is wrong, and `FieldError` says why.

<!-- ::preview item="password-input-form" height="480" combinations="react/kirana" -->

### Controlled

Hold whether the password can be read with `visible` and `onVisibleChange`: here a checkbox shows it as well as the button.

<!-- ::preview item="password-input-controlled" height="400" combinations="react/kirana" -->

### Composing the parts

`PasswordInput` is the root, the input and the toggle together. Write them yourself to put something else in the toggle, or to style one part.

```tsx
import {
  PasswordInputInput,
  PasswordInputRoot,
  PasswordInputToggle,
} from "@/components/ui/password-input"
```

```tsx
<PasswordInputRoot>
  <PasswordInputInput autoComplete="new-password" aria-label="Password" />
  <PasswordInputToggle />
</PasswordInputRoot>
```

## API Reference

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own. The other props are the primitive's: see the [Password Input primitive](/docs/primitives/components/password-input).

### PasswordInput

The whole field: `PasswordInputRoot` holding a `PasswordInputInput` and a `PasswordInputToggle`. It takes the input's props (`id`, `name`, `placeholder`, `autoComplete`, `required`, `aria-invalid` …), which go to the input, and the root's own, below.

| Prop              | Type                                                 | Default | Description                                                        |
| ----------------- | ---------------------------------------------------- | ------- | ------------------------------------------------------------------ |
| `visible`         | `boolean`                                            | -       | Whether the password can be read, when the caller holds it.        |
| `defaultVisible`  | `boolean`                                            | `false` | Whether it can be read at first, when the caller does not hold it. |
| `onVisibleChange` | `(visible: boolean, details: ChangeDetails) => void` | -       | Called as the password is about to be shown or hidden.             |
| `onValueChange`   | `(value: string, details: ChangeDetails) => void`    | -       | Called with what is typed, each time it changes.                   |
| `disabled`        | `boolean`                                            | `false` | Whether nothing can be typed and the button cannot be pressed.     |
| `sx`              | `Sx`                                                 | -       | Styles merged with the field's own (the root draws the field).     |

### PasswordInputRoot

The field: its border, fill, corners and focus ring, around the input and the toggle. It takes the same own props as `PasswordInput` (`visible`, `defaultVisible`, `onVisibleChange`, `onValueChange`, `disabled`) and `children`.

| Prop | Type | Default | Description                         |
| ---- | ---- | ------- | ----------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the field's own. |

### PasswordInputInput

The `<input>`: a password, or text while it is shown. It takes what an `<input>` takes.

| Prop | Type | Default | Description                         |
| ---- | ---- | ------- | ----------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the input's own. |

### PasswordInputToggle

The show/hide button, a ghost icon button at the field's inline end. It names itself "Show password" or "Hide password" and says whether it is pressed.

| Prop       | Type        | Default                    | Description                          |
| ---------- | ----------- | -------------------------- | ------------------------------------ |
| `children` | `ReactNode` | a `PasswordInputIndicator` | What the button draws.               |
| `sx`       | `Sx`        | -                          | Styles merged with the button's own. |

### PasswordInputIndicator

What the button draws: an eye while the password is hidden, the eye struck through while it can be read. It is hidden from assistive technology, as the button names itself.

| Prop       | Type        | Default | Description                 |
| ---------- | ----------- | ------- | --------------------------- |
| `children` | `ReactNode` | the eye | An icon of your own.        |
| `sx`       | `Sx`        | -       | Styles merged with its own. |
