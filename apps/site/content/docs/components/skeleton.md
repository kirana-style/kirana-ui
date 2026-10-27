---
title: Skeleton
description: Shows a placeholder while content is loading.
section: components
order: 16
keywords: [skeleton, component, base, aria]
---

# Skeleton

<!-- ::preview item="skeleton-demo" height="360" combinations="react/base,react/aria" -->

## Installation

With `kirana-style ui`, for every framework:

<!-- ::install exec="kirana-style ui add skeleton" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/skeleton" -->

## Usage

```tsx
import { css } from "@kirana-style/core"

import { Skeleton } from "@/components/ui/skeleton"

const line = css({ height: "1rem", width: "250px" })

export function Example() {
  return <Skeleton sx={line} />
}
```

## Code

What installing it writes, in the default style, for the framework and base you choose:

<!-- ::component-code name="skeleton" combinations="react/base,react/aria" -->
