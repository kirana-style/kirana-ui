---
title: Navigation Menu
description: A collection of links for navigating websites.
section: components
variants: [react/base]
keywords: [navigation, menu, links, nav, component, base]
---

# Navigation Menu

<!-- ::preview item="navigation-menu-demo" height="360" combinations="react/base" -->

## Installation

<!-- ::installation name="navigation-menu" combinations="react/base" -->

## Usage

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
```

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Composition

Use the following composition to build a `NavigationMenu`:

```text
NavigationMenu
├── NavigationMenuList
│   ├── NavigationMenuItem
│   │   ├── NavigationMenuTrigger
│   │   └── NavigationMenuContent
│   │       ├── NavigationMenuLink
│   │       └── NavigationMenuLink
│   └── NavigationMenuItem
│       └── NavigationMenuLink
└── NavigationMenuIndicator
```

## Link Component

Use the `render` prop to draw a link as another element, such as your router's link component, and
give a link in the bar the trigger's look with `navigationMenuTriggerStyle`.

```tsx
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        render={<a href="/docs" />}
        sx={navigationMenuTriggerStyle}
      >
        Documentation
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
```

## API Reference

See the [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu#api-reference) documentation for more information.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
