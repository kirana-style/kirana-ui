---
title: Dropdown Menu
description: Displays a menu of actions or functions, triggered by a button.
section: components
variants: [react/base, react/aria, vue/ark]
order: 8
keywords: [dropdown menu, component, base, aria, ark]
---

# Dropdown Menu

<!-- ::preview item="dropdown-menu-demo" height="460" combinations="react/base,react/aria,vue/ark" -->

## Installation

With `kirana-style ui`:

<!-- ::install exec="kirana-style ui add dropdown-menu" -->

<!-- ::start:only react/base,react/aria -->

With shadcn/ui's CLI, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/dropdown-menu" -->

<!-- ::end:only -->

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

## Code

What installing it writes, in the default style:

<!-- ::component-code name="dropdown-menu" combinations="react/base,react/aria,vue/ark" -->

## Notes per base

<!-- ::start:only react/base -->

On Base UI, a menu's label must sit inside a `DropdownMenuGroup` (or a radio group): Base UI's group label throws when the menu opens without one.

<!-- ::end:only -->
