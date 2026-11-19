---
title: Skeleton
description: Shows a placeholder while content is loading.
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
keywords: [skeleton, component, base, aria, ark, vue, svelte, solid, angular]
---

# Skeleton

<!-- ::preview item="skeleton-demo" height="360" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="skeleton" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/kirana,angular/ng" -->

## Usage

<!-- ::start:tabs -->

### Base UI, UI SDK, Kirana UI, React Aria, Solid · Ark UI, Solid · Kirana UI

```tsx
import { css } from "@kirana-style/core"

import { Skeleton } from "@/components/ui/skeleton"

const line = css({ height: "1rem", width: "250px" })

export function Example() {
  return <Skeleton sx={line} />
}
```

### Vue · Ark UI, Vue · Kirana UI, Vue · Reka UI

```vue
<script setup lang="ts">
import { css } from "@kirana-style/core"

import { Skeleton } from "@/components/ui/skeleton"

const line = css({ height: "1rem", width: "250px" })
</script>

<template>
  <Skeleton :sx="line" />
</template>
```

### Svelte · Ark UI, Svelte · Kirana UI, Svelte · Bits UI

```svelte
<script lang="ts">
  import { css } from "@kirana-style/core"

  import { Skeleton } from "@/components/ui/skeleton"

  const line = css({ height: "1rem", width: "250px" })
</script>

<Skeleton sx={line} />
```

### Solid · Ark UI, Solid · Kirana UI

```tsx
import { css } from "@kirana-style/core"
import { Skeleton } from "@/components/ui/skeleton"

export function Example() {
  const line = css({ height: "1rem", width: "250px" })

  return <Skeleton sx={line} />
}
```

### Angular · NG Primitives, Angular · Kirana UI

```ts
import { Component } from "@angular/core"
import { css } from "@kirana-style/core"

import { Skeleton } from "@/components/ui/skeleton"

@Component({
  selector: "app-example",
  imports: [Skeleton],
  template: `<div kuiSkeleton [sx]="line"></div>`,
})
export class Example {
  protected readonly line = css({ height: "1rem", width: "250px" })
}
```

<!-- ::end:tabs -->

## Avatar

<!-- ::preview item="skeleton-avatar" height="400" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" -->

## Card

<!-- ::preview item="skeleton-card" height="400" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" -->

## Text

<!-- ::preview item="skeleton-text" height="400" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" -->

## Form

<!-- ::preview item="skeleton-form" height="400" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" -->

## Table

<!-- ::preview item="skeleton-table" height="400" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" -->

<!-- ::start:only react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/ark,vue/reka,vue/uisdk,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="skeleton-rtl" height="360" combinations="react/base,react/aria,vue/kirana,vue/ark,vue/reka,svelte/kirana,svelte/ark,svelte/bits,svelte/uisdk,solid/kirana,solid/ark,angular/ng" direction="rtl" -->

<!-- ::end:only -->
