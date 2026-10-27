---
title: Card
description: Displays a card with a header, content and footer.
section: components
order: 4
keywords: [card, component, base, aria]
---

# Card

<!-- ::preview item="card-demo" height="560" combinations="react/base,react/aria" -->

## Installation

With `kirana-style ui`, for every framework:

<!-- ::install exec="kirana-style ui add card" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/card" -->

## Usage

```tsx
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
```

## Code

What installing it writes, in the default style, for the framework and base you choose:

<!-- ::component-code name="card" combinations="react/base,react/aria" -->
