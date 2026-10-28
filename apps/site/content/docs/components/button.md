---
title: Button
description: Displays a button or a component that looks like a button.
section: components
order: 3
keywords: [button, component, base, aria, ark, vue, svelte, solid, angular]
---

# Button

<!-- ::preview item="button-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

A button drawn on a link keeps the link's role: on Base UI, `render={<a href="/" />}` with `nativeButton={false}`.

## Installation

With `kirana-style ui`, for every framework:

<!-- ::install exec="kirana-style ui add button" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/button" -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return <Button variant="outline">Button</Button>
}
```

### React Aria

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return <Button variant="outline">Button</Button>
}
```

### Vue

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button"
</script>

<template>
  <Button variant="outline">Button</Button>
</template>
```

### Svelte

```svelte
<script lang="ts">
  import { Button } from "@/components/ui/button"
</script>

<Button variant="outline">Button</Button>
```

### Solid

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return <Button variant="outline">Button</Button>
}
```

### Angular

```ts
import { Component } from "@angular/core"

import { Button } from "@/components/ui/button"

@Component({
  selector: "app-example",
  imports: [Button],
  template: `<button kuiButton variant="outline">Button</button>`,
})
export class Example {}
```

<!-- ::end:tabs -->

## Code

What installing it writes, in the default style, for the framework and base you choose:

<!-- ::component-code name="button" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->
