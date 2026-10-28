---
title: Label
description: Renders an accessible label associated with a control.
section: components
variants: [react/base, react/aria]
order: 11
keywords: [label, component, base, aria]
---

# Label

<!-- ::preview item="card-demo" height="560" combinations="react/base,react/aria" -->

The preview shows the Card's demo, whose fields are labelled with it.

## Installation

With `kirana-style ui`:

<!-- ::install exec="kirana-style ui add label" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/label" -->

## Usage

```tsx
import { Label } from "@/components/ui/label"

export function Example() {
  return <Label htmlFor="email">Email</Label>
}
```

## Code

What installing it writes, in the default style:

<!-- ::component-code name="label" combinations="react/base,react/aria" -->
