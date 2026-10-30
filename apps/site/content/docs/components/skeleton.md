---
title: Skeleton
description: Shows a placeholder while content is loading.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords: [skeleton, component, base, aria, ark, vue, svelte, solid, angular]
---

# Skeleton

<!-- ::preview item="skeleton-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="skeleton" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Usage

<!-- ::start:tabs -->

### Base UI, React Aria, Solid

```tsx
import { css } from "@kirana-style/core"

import { Skeleton } from "@/components/ui/skeleton"

const line = css({ height: "1rem", width: "250px" })

export function Example() {
  return <Skeleton sx={line} />
}
```

### Vue

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

### Svelte

```svelte
<script lang="ts">
  import { css } from "@kirana-style/core"

  import { Skeleton } from "@/components/ui/skeleton"

  const line = css({ height: "1rem", width: "250px" })
</script>

<Skeleton sx={line} />
```

### Angular

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

<!-- ::preview item="skeleton-avatar" height="400" combinations="react/base,react/aria" -->

## Card

<!-- ::preview item="skeleton-card" height="400" combinations="react/base,react/aria" -->

## Text

<!-- ::preview item="skeleton-text" height="400" combinations="react/base,react/aria" -->

## Form

<!-- ::preview item="skeleton-form" height="400" combinations="react/base,react/aria" -->

## Table

<!-- ::preview item="skeleton-table" height="400" combinations="react/base,react/aria" -->

<!-- ::start:only react/base,react/aria -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="skeleton-rtl" height="360" combinations="react/base,react/aria" direction="rtl" -->

<!-- ::end:only -->
