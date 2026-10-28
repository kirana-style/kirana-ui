---
title: Avatar
description: An image element with a fallback for representing the user.
section: components
variants: [react/base, react/aria]
keywords: [avatar, component, base, aria]
---

# Avatar

<!-- ::preview item="avatar-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="avatar" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
```

## Notes per base

React Aria has no avatar of its own: the image says whether it loaded, and the fallback shows after an image that failed, including one that failed before the page hydrated.
