---
title: Input
description: Displays a form input field.
section: components
variants: [react/base, react/aria]
order: 10
keywords: [input, component, base, aria]
---

# Input

<!-- ::preview item="input-demo" height="360" combinations="react/base,react/aria" -->

## Installation

With `kirana-style ui`:

<!-- ::install exec="kirana-style ui add input" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/input" -->

## Usage

```tsx
import { Input } from "@/components/ui/input"

export function Example() {
  return <Input type="email" placeholder="Email" />
}
```

## Code

What installing it writes, in the default style:

<!-- ::component-code name="input" combinations="react/base,react/aria" -->
