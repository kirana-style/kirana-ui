---
title: Kbd
description: Used to display textual user input from keyboard.
section: components
variants:
  [
    react/kirana,
    react/base,
    react/aria,
    react/uisdk,
    vue/kirana,
    vue/ark,
    vue/reka,
    vue/uisdk,
    svelte/kirana,
    svelte/ark,
    svelte/bits,
    svelte/uisdk,
    solid/kirana,
    solid/ark,
    angular/kirana,
    angular/ng,
  ]
keywords:
  [kbd, keyboard, shortcut, component, base, aria, ark, vue, svelte, solid]
---

# Kbd

<!-- ::preview item="kbd-demo" height="360" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="kbd" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/kirana,angular/ng" -->

## Usage

```tsx
import { Kbd } from "@/components/ui/kbd"
```

<!-- ::start:only react/kirana,react/base,react/aria,react/uisdk -->

```tsx
<Kbd>Ctrl</Kbd>
```

<!-- ::end:only -->

<!-- ::start:only vue/kirana,vue/ark,vue/reka,vue/uisdk -->

```vue
<template>
  <Kbd>Ctrl</Kbd>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk -->

```svelte
<Kbd>Ctrl</Kbd>
```

<!-- ::end:only -->

<!-- ::start:only solid/kirana,solid/ark -->

```tsx
<Kbd>Ctrl</Kbd>
```

<!-- ::end:only -->

<!-- ::start:only angular/kirana,angular/ng -->

```ts
import { Component } from "@angular/core"
import { Kbd } from "@/components/ui/kbd"

@Component({
  selector: "app-example",
  imports: [Kbd],
  template: ` <kbd kuiKbd>Ctrl</kbd> `,
})
export class Example {}
```

<!-- ::end:only -->

## Composition

Use the following composition to build `Kbd` and `KbdGroup`:

```text
Kbd
KbdGroup
├── Kbd
└── Kbd
```

## Group

Use the `KbdGroup` component to group keyboard keys together.

<!-- ::preview item="kbd-group" height="360" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" -->

## Button

Use the `Kbd` component inside a `Button` component to display a keyboard key inside a button.

<!-- ::preview item="kbd-button" height="360" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" -->

## Tooltip

You can use the `Kbd` component inside a `Tooltip` component to display a tooltip with a keyboard key.

<!-- ::preview item="kbd-tooltip" height="360" combinations="react/kirana,react/base,react/aria,vue/ark,vue/reka,svelte/kirana,svelte/ark,svelte/bits,solid/kirana,solid/ark,angular/ng" -->

## Input Group

You can use the `Kbd` component inside a `InputGroupAddon` component to display a keyboard key inside an input group.

<!-- ::preview item="kbd-input-group" height="360" combinations="react/kirana,react/base,react/aria,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="kbd-rtl" height="360" combinations="react/base,react/aria,vue/kirana,vue/ark,vue/reka,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" direction="rtl" -->

## API Reference

### Kbd

Use the `Kbd` component to display a keyboard key.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | ``      |

```tsx
<Kbd>Ctrl</Kbd>
```

### KbdGroup

Use the `KbdGroup` component to group `Kbd` components together.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | ``      |

```tsx
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>
```

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
