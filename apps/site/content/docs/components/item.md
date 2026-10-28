---
title: Item
description: A versatile component for displaying content with media, title, description, and actions.
section: components
variants: [react/base, react/aria]
keywords: [item, list item, row, media, component, base, aria]
---

# Item

<!-- ::preview item="item-demo" height="360" combinations="react/base,react/aria" -->

The `Item` component is a straightforward flex container that can house nearly any type of content. Use it to display a title, description, and actions. Group it with the `ItemGroup` component to create a list of items.

## Installation

<!-- ::installation name="item" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
```

```tsx
<Item>
  <ItemMedia variant="icon">
    <Icon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Title</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button>Action</Button>
  </ItemActions>
</Item>
```

## Composition

Use the following composition to build an `Item`:

```text
ItemGroup
└── Item
    ├── ItemHeader
    ├── ItemMedia
    ├── ItemContent
    │   ├── ItemTitle
    │   └── ItemDescription
    ├── ItemActions
    └── ItemFooter
```

## Item vs Field

Use `Field` if you need to display a form input such as a checkbox, input, radio, or select.

If you only need to display content such as a title, description, and actions, use `Item`.

## Variant

Use the `variant` prop to change the visual style of the item.

<!-- ::preview item="item-variant" height="360" combinations="react/base,react/aria" -->

## Size

Use the `size` prop to change the size of the item. Available sizes are `default`, `sm`, and `xs`.

<!-- ::preview item="item-size" height="360" combinations="react/base,react/aria" -->

## Icon

Use `ItemMedia` with `variant="icon"` to display an icon.

<!-- ::preview item="item-icon" height="360" combinations="react/base,react/aria" -->

## Avatar

You can use `ItemMedia` with `variant="avatar"` to display an avatar.

<!-- ::preview item="item-avatar" height="360" combinations="react/base,react/aria" -->

## Image

Use `ItemMedia` with `variant="image"` to display an image.

<!-- ::preview item="item-image" height="360" combinations="react/base,react/aria" -->

## Group

Use `ItemGroup` to group related items together.

<!-- ::preview item="item-group" height="360" combinations="react/base,react/aria" -->

## Header

Use `ItemHeader` to add a header above the item content.

<!-- ::preview item="item-header" height="360" combinations="react/base,react/aria" -->

## Link

Use the `render` prop to render the item as a link. The hover and focus states will be applied to the anchor element.

<!-- ::preview item="item-link" height="360" combinations="react/base,react/aria" -->

<!-- ::start:only react/base -->

```tsx
<Item render={<a href="#dashboard" />}>
  <ItemMedia variant="icon">
    <HomeIcon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Dashboard</ItemTitle>
    <ItemDescription>Overview of your account and activity.</ItemDescription>
  </ItemContent>
</Item>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
<Item href="#dashboard">
  <ItemMedia variant="icon">
    <HomeIcon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Dashboard</ItemTitle>
    <ItemDescription>Overview of your account and activity.</ItemDescription>
  </ItemContent>
</Item>
```

<!-- ::end:only -->

## Dropdown

<!-- ::preview item="item-dropdown" height="360" combinations="react/base,react/aria" -->

## API Reference

### Item

The main component for displaying content with media, title, description, and actions.

| Prop      | Type                                | Default     |
| --------- | ----------------------------------- | ----------- |
| `variant` | `"default" \| "outline" \| "muted"` | `"default"` |
| `size`    | `"default" \| "sm" \| "xs"`         | `"default"` |
| `render`  | `React.ReactElement`                |             |

### ItemGroup

A container that groups related items together with consistent styling.

```tsx
<ItemGroup>
  <Item />
  <Item />
</ItemGroup>
```

### ItemSeparator

A separator between items in a group.

```tsx
<ItemGroup>
  <Item />
  <ItemSeparator />
  <Item />
</ItemGroup>
```

### ItemMedia

Use `ItemMedia` to display media content such as icons, images, or avatars.

| Prop      | Type                             | Default     |
| --------- | -------------------------------- | ----------- |
| `variant` | `"default" \| "icon" \| "image"` | `"default"` |

```tsx
<ItemMedia variant="icon">
  <Icon />
</ItemMedia>
```

```tsx
<ItemMedia variant="image">
  <img src="..." alt="..." />
</ItemMedia>
```

### ItemContent

Wraps the title and description of the item.

```tsx
<ItemContent>
  <ItemTitle>Title</ItemTitle>
  <ItemDescription>Description</ItemDescription>
</ItemContent>
```

### ItemTitle

Displays the title of the item.

```tsx
<ItemTitle>Item Title</ItemTitle>
```

### ItemDescription

Displays the description of the item.

```tsx
<ItemDescription>Item description</ItemDescription>
```

### ItemActions

Container for action buttons or other interactive elements.

```tsx
<ItemActions>
  <Button>Action</Button>
</ItemActions>
```

### ItemHeader

Displays a header above the item content.

```tsx
<Item>
  <ItemHeader>Header</ItemHeader>
  <ItemContent>...</ItemContent>
</Item>
```

### ItemFooter

Displays a footer below the item content.

```tsx
<Item>
  <ItemContent>...</ItemContent>
  <ItemFooter>Footer</ItemFooter>
</Item>
```

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
