---
title: Empty
description: Use the Empty component to display an empty state.
section: components
variants: [react/base, react/aria]
keywords: [empty, empty state, placeholder, component, base, aria]
---

# Empty

<!-- ::preview item="empty-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="empty" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
```

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon />
    </EmptyMedia>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add data</Button>
  </EmptyContent>
</Empty>
```

## Composition

Use the following composition to build an `Empty` state:

```text
Empty
├── EmptyHeader
│   ├── EmptyMedia
│   ├── EmptyTitle
│   └── EmptyDescription
└── EmptyContent
```

## Outline

Use the `border` utility class to create an outline empty state.

<!-- ::preview item="empty-outline" height="360" combinations="react/base,react/aria" -->

## Background

Use the `bg-*` and `bg-gradient-*` utilities to add a background to the empty state.

<!-- ::preview item="empty-background" height="360" combinations="react/base,react/aria" -->

## Avatar

Use the `EmptyMedia` component to display an avatar in the empty state.

<!-- ::preview item="empty-avatar" height="360" combinations="react/base,react/aria" -->

## Avatar Group

Use the `EmptyMedia` component to display an avatar group in the empty state.

<!-- ::preview item="empty-avatar-group" height="360" combinations="react/base,react/aria" -->

## InputGroup

You can add an `InputGroup` component to the `EmptyContent` component.

<!-- ::preview item="empty-input-group" height="360" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="empty-rtl" height="360" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

### Empty

The main component of the empty state. Wraps the `EmptyHeader` and `EmptyContent` components.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

```tsx
<Empty>
  <EmptyHeader />
  <EmptyContent />
</Empty>
```

### EmptyHeader

The `EmptyHeader` component wraps the empty media, title, and description.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

```tsx
<EmptyHeader>
  <EmptyMedia />
  <EmptyTitle />
  <EmptyDescription />
</EmptyHeader>
```

### EmptyMedia

Use the `EmptyMedia` component to display the media of the empty state such as an icon or an image. You can also use it to display other components such as an avatar.

| Prop        | Type                  | Default   |
| ----------- | --------------------- | --------- |
| `variant`   | `"default" \| "icon"` | `default` |
| `className` | `string`              |           |

```tsx
<EmptyMedia variant="icon">
  <Icon />
</EmptyMedia>
```

```tsx
<EmptyMedia>
  <Avatar>
    <AvatarImage src="..." />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</EmptyMedia>
```

### EmptyTitle

Use the `EmptyTitle` component to display the title of the empty state.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

```tsx
<EmptyTitle>No data</EmptyTitle>
```

### EmptyDescription

Use the `EmptyDescription` component to display the description of the empty state.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

```tsx
<EmptyDescription>You do not have any notifications.</EmptyDescription>
```

### EmptyContent

Use the `EmptyContent` component to display the content of the empty state such as a button, input or a link.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

```tsx
<EmptyContent>
  <Button>Add Project</Button>
</EmptyContent>
```

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
