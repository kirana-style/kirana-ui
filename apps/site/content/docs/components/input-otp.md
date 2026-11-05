---
title: Input OTP
description: Accessible one-time password component with copy-paste functionality.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords:
  [input otp, one-time password, code, form, component, base, aria, ark, vue]
---

# Input OTP

<!-- ::preview item="input-otp-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## About

Input OTP is built on top of [input-otp](https://github.com/guilhermerodz/input-otp) by [@guilherme_rodz](https://twitter.com/guilherme_rodz).

## Installation

<!-- ::installation name="input-otp" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Usage

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
```

<!-- ::start:only react/base,react/aria -->

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

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <InputOTP :max-length="6">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
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

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

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

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

@Component({
  selector: "app-example",
  imports: [InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot],
  template: `
    <div kuiInputOTP [maxLength]="6">
      <div kuiInputOTPGroup>
        <div kuiInputOTPSlot [index]="0"></div>
        <div kuiInputOTPSlot [index]="1"></div>
        <div kuiInputOTPSlot [index]="2"></div>
      </div>
      <div kuiInputOTPSeparator></div>
      <div kuiInputOTPGroup>
        <div kuiInputOTPSlot [index]="3"></div>
        <div kuiInputOTPSlot [index]="4"></div>
        <div kuiInputOTPSlot [index]="5"></div>
      </div>
    </div>
  `,
})
export class Example {}
```

<!-- ::end:only -->

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

<!-- ::preview item="input-otp-pattern" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Separator

Use the `<InputOTPSeparator />` component to add a separator between input groups.

<!-- ::preview item="input-otp-separator" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Disabled

Use the `disabled` prop to disable the input.

<!-- ::preview item="input-otp-disabled" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Controlled

Use the `value` and `onChange` props to control the input value.

<!-- ::preview item="input-otp-controlled" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Invalid

Use `aria-invalid` on the slots to show an error state.

<!-- ::preview item="input-otp-invalid" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Four Digits

A common pattern for PIN codes. This uses the `pattern={REGEXP_ONLY_DIGITS}` prop.

<!-- ::preview item="input-otp-four-digits" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Alphanumeric

Use `REGEXP_ONLY_DIGITS_AND_CHARS` to accept both letters and numbers.

<!-- ::preview item="input-otp-alphanumeric" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Form

<!-- ::preview item="input-otp-form" height="480" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="input-otp-rtl" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" direction="rtl" -->

## API Reference

See the [input-otp](https://input-otp.rodz.dev) documentation for more information.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.

<!-- ::start:only angular/ng -->

Angular's is the registry's own, drawn as the `input-otp` package React's is built on draws it (one input over the slots): `maxLength`, `[(value)]` or `defaultValue`, `type` (`numeric`, `alphanumeric`, `alphabetic`), `disabled`, and `complete` once every slot is filled.

<!-- ::end:only -->
