---
title: Dropdown Menu
description: Displays a menu of actions or functions, triggered by a button.
section: components
variants: [react/base, react/aria, vue/ark]
keywords: [dropdown menu, component, base, aria, ark]
---

# Dropdown Menu

<!-- ::preview item="dropdown-menu-demo" height="460" combinations="react/base,react/aria,vue/ark" -->

## Installation

<!-- ::installation name="dropdown-menu" combinations="react/base,react/aria,vue/ark" -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### React Aria

```tsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Example() {
  return (
    <DropdownMenuTrigger>
      <Button variant="outline">Open</Button>
      <DropdownMenu>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>
  )
}
```

<!-- ::end:tabs -->

<!-- ::start:only react/base -->

## Notes per base

On Base UI, a menu's label must sit inside a `DropdownMenuGroup` (or a radio group): Base UI's group label throws when the menu opens without one.

<!-- ::end:only -->
