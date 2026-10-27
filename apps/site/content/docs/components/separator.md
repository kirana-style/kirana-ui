---
title: Separator
description: Visually or semantically separates content.
section: components
order: 13
keywords: [separator, component, base, aria]
---

# Separator

<!-- ::preview item="separator-demo" height="360" combinations="react/base,react/aria" -->

## Installation

With `kirana-style ui`, for every framework:

<!-- ::install exec="kirana-style ui add separator" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/separator" -->

## Usage

```tsx
import { Separator } from "@/components/ui/separator"

export function Example() {
  return (
    <>
      <Separator />
      <Separator orientation="vertical" />
    </>
  )
}
```

## Code

What installing it writes, in the default style, for the framework and base you choose:

<!-- ::component-code name="separator" combinations="react/base,react/aria" -->
