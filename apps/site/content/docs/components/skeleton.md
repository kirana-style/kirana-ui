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

With `kirana-style ui`:

<!-- ::install exec="kirana-style ui add skeleton" -->

<!-- ::start:only svelte/ark,solid/ark,angular/ng -->

Installing it into this framework is not checked yet.

<!-- ::end:only -->

<!-- ::start:only react/base,react/aria -->

With shadcn/ui's CLI, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/skeleton" -->

<!-- ::end:only -->

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

## Code

What installing it writes, in the default style:

<!-- ::component-code name="skeleton" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->
