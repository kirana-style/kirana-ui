---
title: Copy Button
description: A button that copies a value to the clipboard and shows for a moment that it did, built from the registry's Button.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords: [copy, clipboard, button, copied, component, kirana]
---

# Copy Button

<!-- ::preview item="copy-button-demo" height="360" combinations="react/kirana" -->

Copy Button is the registry's [Button](/docs/components/button), with every variant and size, that writes `value` to the clipboard when pressed. For two seconds after, its copy icon turns to a check, its name changes from "Copy" to "Copied", and it carries `data-copied`. It needs no primitive of its own: it is built from the Button of the Kirana UI bases.

## Installation

<!-- ::installation name="copy-button" combinations="react/kirana" -->

## Usage

<!-- ::start:tabs -->

### Kirana UI, Solid · Kirana UI

```tsx
import { CopyButton } from "@/components/ui/copy-button"
```

```tsx
<CopyButton value="npx kirana-style ui add copy-button" />
```

### Vue · Kirana UI

```vue
<script setup lang="ts">
import { CopyButton } from "@/components/ui/copy-button"
</script>

<template>
  <CopyButton value="npx kirana-style ui add copy-button" />
</template>
```

### Svelte · Kirana UI

```svelte
<script lang="ts">
  import { CopyButton } from "@/components/ui/copy-button"
</script>

<CopyButton value="npx kirana-style ui add copy-button" />
```

### Angular · Kirana UI

```ts
import { Component } from "@angular/core"

import { CopyButton } from "@/components/ui/copy-button"

@Component({
  selector: "app-example",
  imports: [CopyButton],
  template: `<button
    kuiCopyButton
    value="npx kirana-style ui add copy-button"
  ></button>`,
})
export class Example {}
```

<!-- ::end:tabs -->

## Examples

### With text

Children are drawn beside the icon and name the button, so it has no `aria-label` of its own. A screen reader still hears `copiedLabel` once it has copied.

<!-- ::preview item="copy-button-text" height="360" combinations="react/kirana" -->

### Variants and sizes

It takes the Button's `variant` and `size`. It is `ghost` and `icon-sm` unless told otherwise.

<!-- ::preview item="copy-button-variants" height="360" combinations="react/kirana" -->

### In an input group

At the end of a read-only input, inside an Input Group's addon, sized as the group's own buttons.

<!-- ::preview item="copy-button-input" height="360" combinations="react/kirana" -->

## API Reference

### CopyButton

A Button that copies `value` when pressed. The icon swap is a short fade and scale, which stops when the reader asks for reduced motion. Its other props are the Button's, and it takes Kirana's `sx` in place of `className`.

| Prop          | Type                      | Default     | Description                                                                 |
| ------------- | ------------------------- | ----------- | --------------------------------------------------------------------------- |
| `value`       | `string`                  | -           | Required. The text written to the clipboard.                                |
| `timeout`     | `number`                  | `2000`      | How long it shows that it copied, in milliseconds. `0` keeps it shown.      |
| `copyLabel`   | `string`                  | `"Copy"`    | Its name at rest, when it has no children. Both labels can be translated.   |
| `copiedLabel` | `string`                  | `"Copied"`  | Its name once it has copied, and what a screen reader hears then.           |
| `onCopy`      | `(value: string) => void` | -           | Called with the value once it is on the clipboard.                          |
| `onError`     | `() => void`              | -           | Called when the clipboard refuses the value. The button then shows nothing. |
| `variant`     | Button's `variant`        | `"ghost"`   | The Button's variant.                                                       |
| `size`        | Button's `size`           | `"icon-sm"` | The Button's size.                                                          |
| `children`    | `ReactNode`               | -           | Drawn beside the icon, naming the button.                                   |
| `sx`          | `Sx`                      | -           | Styles merged with the button's own.                                        |

<!-- ::start:only vue/kirana -->

In Vue, `onCopy` and `onError` are the events `copy` (with the value) and `error`, and the children are the default slot.

<!-- ::end:only -->

<!-- ::start:only angular/kirana -->

In Angular it is `<button kuiCopyButton>`: `onCopy` and `onError` are the outputs `copied` (with the value) and `copyError`, and the children are its content.

<!-- ::end:only -->

| Attribute     | Element        | Description                             |
| ------------- | -------------- | --------------------------------------- |
| `data-copied` | The button     | Present while it shows that it copied.  |
| `data-slot`   | The button     | `copy-button`.                          |
| `data-slot`   | The icon's box | `copy-button-icon`, holding both icons. |
