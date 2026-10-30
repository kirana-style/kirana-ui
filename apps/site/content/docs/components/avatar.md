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

## Composition

Use the following composition to build an `Avatar`:

```text
Avatar
├── AvatarImage
├── AvatarFallback
└── AvatarBadge
```

Use the following composition to build an `AvatarGroup`:

```text
AvatarGroup
├── Avatar
│   ├── AvatarImage
│   ├── AvatarFallback
│   └── AvatarBadge
├── Avatar
│   ├── AvatarImage
│   ├── AvatarFallback
│   └── AvatarBadge
└── AvatarGroupCount
```

## Basic

A basic avatar component with an image and a fallback.

<!-- ::preview item="avatar-basic" height="400" combinations="react/base,react/aria" -->

## Badge

Use the `AvatarBadge` component to add a badge to the avatar. The badge is positioned at the bottom right of the avatar.

<!-- ::preview item="avatar-badge" height="400" combinations="react/base,react/aria" -->

Pass a style to the badge with `sx`: its own colour, or a size.

```tsx
const online = css({
  backgroundColor: `light-dark(${color.green[600]}, ${color.green[800]})`,
})

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarBadge sx={online} />
</Avatar>
```

## Badge with Icon

You can also use an icon inside `<AvatarBadge>`.

<!-- ::preview item="avatar-badge-icon" height="400" combinations="react/base,react/aria" -->

## Avatar Group

Use the `AvatarGroup` component to add a group of avatars.

<!-- ::preview item="avatar-group" height="400" combinations="react/base,react/aria" -->

## Avatar Group Count

Use `<AvatarGroupCount>` to add a count to the group.

<!-- ::preview item="avatar-group-count" height="400" combinations="react/base,react/aria" -->

## Avatar Group with Icon

You can also use an icon inside `<AvatarGroupCount>`.

<!-- ::preview item="avatar-group-count-icon" height="400" combinations="react/base,react/aria" -->

## Sizes

Use the `size` prop to change the size of the avatar.

<!-- ::preview item="avatar-size" height="400" combinations="react/base,react/aria" -->

## Dropdown

You can use the `Avatar` component as a trigger for a dropdown menu.

<!-- ::preview item="avatar-dropdown" height="400" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="avatar-rtl" height="288" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

### Avatar

The `Avatar` component is the root component that wraps the avatar image and fallback.

| Prop   | Type                        | Default     |
| ------ | --------------------------- | ----------- |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` |
| `sx`   | `Sx`                        | -           |

### AvatarImage

<!-- ::start:only react/base -->

The `AvatarImage` component displays the avatar image. It accepts all Base UI Avatar Image props.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

The `AvatarImage` component displays the avatar image.

<!-- ::end:only -->

| Prop  | Type     | Default |
| ----- | -------- | ------- |
| `src` | `string` | -       |
| `alt` | `string` | -       |
| `sx`  | `Sx`     | -       |

### AvatarFallback

<!-- ::start:only react/base -->

The `AvatarFallback` component displays a fallback when the image fails to load. It accepts all Base UI Avatar Fallback props.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

The `AvatarFallback` component displays a fallback when the image fails to load.

<!-- ::end:only -->

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### AvatarBadge

The `AvatarBadge` component displays a badge indicator on the avatar, typically positioned at the bottom right.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### AvatarGroup

The `AvatarGroup` component displays a group of avatars with overlapping styling.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### AvatarGroupCount

The `AvatarGroupCount` component displays a count indicator in an avatar group, typically showing the number of additional avatars.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

<!-- ::start:only react/base -->

For more information about Base UI Avatar props, see the [Base UI documentation](https://base-ui.com/react/components/avatar#api-reference).

<!-- ::end:only -->
