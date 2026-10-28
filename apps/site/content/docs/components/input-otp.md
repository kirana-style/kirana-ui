---
title: Input OTP
description: Accessible one-time password component with copy-paste functionality.
section: components
variants: [react/base, react/aria]
keywords: [input otp, one-time password, code, form, component, base, aria]
---

# Input OTP

<!-- ::preview item="input-otp-demo" height="360" combinations="react/base,react/aria" -->

## About

Input OTP is built on top of [input-otp](https://github.com/guilhermerodz/input-otp) by [@guilherme_rodz](https://twitter.com/guilherme_rodz).

## Installation

<!-- ::installation name="input-otp" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
```

```tsx
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

## Composition

Use the following composition to build an `InputOTP`:

```text
InputOTP
├── InputOTPGroup
│   ├── InputOTPSlot
│   ├── InputOTPSlot
│   └── InputOTPSlot
├── InputOTPSeparator
├── InputOTPGroup
│   ├── InputOTPSlot
│   ├── InputOTPSlot
│   └── InputOTPSlot
├── InputOTPSeparator
└── InputOTPGroup
    ├── InputOTPSlot
    └── InputOTPSlot
```

## Pattern

Use the `pattern` prop to define a custom pattern for the OTP input.

```tsx
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

;<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  ...
</InputOTP>
```

<!-- ::preview item="input-otp-pattern" height="360" combinations="react/base,react/aria" -->

## Separator

Use the `<InputOTPSeparator />` component to add a separator between input groups.

<!-- ::preview item="input-otp-separator" height="360" combinations="react/base,react/aria" -->

## Disabled

Use the `disabled` prop to disable the input.

<!-- ::preview item="input-otp-disabled" height="360" combinations="react/base,react/aria" -->

## Controlled

Use the `value` and `onChange` props to control the input value.

<!-- ::preview item="input-otp-controlled" height="360" combinations="react/base,react/aria" -->

## Invalid

Use `aria-invalid` on the slots to show an error state.

<!-- ::preview item="input-otp-invalid" height="360" combinations="react/base,react/aria" -->

## Four Digits

A common pattern for PIN codes. This uses the `pattern={REGEXP_ONLY_DIGITS}` prop.

<!-- ::preview item="input-otp-four-digits" height="360" combinations="react/base,react/aria" -->

## Alphanumeric

Use `REGEXP_ONLY_DIGITS_AND_CHARS` to accept both letters and numbers.

<!-- ::preview item="input-otp-alphanumeric" height="360" combinations="react/base,react/aria" -->

## Form

<!-- ::preview item="input-otp-form" height="480" combinations="react/base,react/aria" -->

## API Reference

See the [input-otp](https://input-otp.rodz.dev) documentation for more information.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
