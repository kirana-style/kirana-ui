---
title: Empty
description: Use the Empty component to display an empty state.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords:
  [empty, empty state, placeholder, component, base, aria, ark, vue, svelte]
---

# Empty

<!-- ::preview item="empty-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="empty" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

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

<!-- ::start:only react/base,react/aria -->

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

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
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
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
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

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

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

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

@Component({
  selector: "app-example",
  imports: [
    IconPlaceholder,
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
  ],
  template: `
    <div kuiEmpty>
      <div kuiEmptyHeader>
        <div kuiEmptyMedia variant="icon">
          <svg
            iconPlaceholder
            lucide="FolderCodeIcon"
            tabler="IconFolderCode"
            hugeicons="FolderCodeIcon"
            phosphor="FolderIcon"
            remixicon="RiFolderLine"
          ></svg>
        </div>
        <div kuiEmptyTitle>No data</div>
        <div kuiEmptyDescription>No data found</div>
      </div>
      <div kuiEmptyContent>
        <button kuiButton>Add data</button>
      </div>
    </div>
  `,
})
export class Example {}
```

<!-- ::end:only -->

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

<!-- ::preview item="empty-outline" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Background

Use the `bg-*` and `bg-gradient-*` utilities to add a background to the empty state.

<!-- ::preview item="empty-background" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Avatar

Use the `EmptyMedia` component to display an avatar in the empty state.

<!-- ::preview item="empty-avatar" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Avatar Group

Use the `EmptyMedia` component to display an avatar group in the empty state.

<!-- ::preview item="empty-avatar-group" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## InputGroup

You can add an `InputGroup` component to the `EmptyContent` component.

<!-- ::preview item="empty-input-group" height="360" combinations="react/base,react/aria,vue/ark" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="empty-rtl" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" direction="rtl" -->

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
