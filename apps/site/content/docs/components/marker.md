---
title: Marker
description: Displays an inline status, system note, bordered row, or labeled separator in a conversation.
section: components
variants: [react/base, react/aria]
keywords: [marker, status, separator, note, component, base, aria]
---

# Marker

<!-- ::preview item="marker-demo" height="360" combinations="react/base,react/aria" -->

The `Marker` component displays inline conversation markers such as status updates, system notes, bordered rows, and labeled separators. Compose it with `Message` in a conversation thread.

## Installation

<!-- ::installation name="marker" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
```

```tsx
<Marker>
  <MarkerIcon>
    <CheckIcon />
  </MarkerIcon>
  <MarkerContent>Explored 4 files</MarkerContent>
</Marker>
```

## Composition

Use the following composition to build a marker:

```text
Marker
├── MarkerIcon
└── MarkerContent
```

## Features

- Inline marker, bordered row, and labeled separator variants
- Decorative icon slot that is hidden from assistive tech
- Polymorphic root via `render` for link and button markers
- Pairs with the [shimmer](/docs/utils/shimmer) for streaming status text
- Customizable styling through the `className` prop on every part

## Variants

Use `variant` to switch between an inline marker, bordered row, and labeled separator.

<!-- ::preview item="marker-variants" height="360" combinations="react/base,react/aria" -->

| Variant     | Description                                          |
| ----------- | ---------------------------------------------------- |
| `default`   | An inline marker for status, notes, and actions.     |
| `border`    | A default marker with a bottom border under the row. |
| `separator` | A centered label with divider lines on each side.    |

## Status

Set `role="status"` and include a [`Spinner`](/docs/components/spinner) for streaming or in-progress markers so updates are announced.

<!-- ::preview item="marker-status" height="360" combinations="react/base,react/aria" -->

## Shimmer

Give `MarkerContent` the [shimmer](/docs/utils/shimmer), a highlight sweeping across the text, for an animated streaming-text effect.

<!-- ::preview item="marker-shimmer" height="360" combinations="react/base,react/aria" -->

## Separator

<!-- ::start:only react/base -->

Use the `separator` variant for labeled dividers, such as dates or section breaks, in a conversation. A [Checkpoint](/docs/ai-elements/checkpoint) is a separator with a button that restores the thread to that point.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `separator` variant for labeled dividers, such as dates or section breaks, in a conversation. A [Checkpoint](/docs/ai-elements/checkpoint) is a separator with a button that restores the thread to that point.

<!-- ::end:only -->

<!-- ::preview item="marker-separator" height="360" combinations="react/base,react/aria" -->

## Border

Use the `border` variant for status rows that should keep the default marker alignment while separating the next row.

<!-- ::preview item="marker-border" height="360" combinations="react/base,react/aria" -->

## With Icon

Use `MarkerIcon` to render an icon alongside the content. Use `flex-col` to stack the icon above the content.

<!-- ::preview item="marker-icon" height="360" combinations="react/base,react/aria" -->

## Links and Buttons

Turn a marker into a link or button with the `render` prop on `Marker`.

<!-- ::preview item="marker-link-button" height="360" combinations="react/base,react/aria" -->

<!-- ::start:only react/base -->

```tsx
import { Marker, MarkerContent } from "@/components/ui/marker"

export function MarkerLinkDemo() {
  return (
    <Marker render={<a href="#" />}>
      <MarkerContent>View the pull request</MarkerContent>
    </Marker>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import { Marker, MarkerContent } from "@/components/ui/marker"

export function MarkerLinkDemo() {
  return (
    <Marker render={(props) => <a {...props} href="#" />}>
      <MarkerContent>View the pull request</MarkerContent>
    </Marker>
  )
}
```

<!-- ::end:only -->

## Accessibility

`Marker` is presentational by default. The correct semantics depend on how you use it, so choose the role based on intent rather than relying on a single default.

### Status and Progress

For streaming or progress markers such as "Thinking..." or a running tool, set `role="status"` so assistive tech announces the update as it appears. `Marker` forwards `role` to the underlying element.

```tsx
<Marker role="status">
  <MarkerIcon>
    <Spinner />
  </MarkerIcon>
  <MarkerContent>Compacting conversation</MarkerContent>
</Marker>
```

### Labeled Separators

A separator that carries text, such as a date or a section label, needs no role. The divider lines are decorative CSS pseudo-elements, and the text is announced as ordinary content.

```tsx
<Marker variant="separator">
  <MarkerContent>Today</MarkerContent>
</Marker>
```

> [!NOTE]
> Do not add `role="separator"` to a labeled divider. A separator takes its
> accessible name from `aria-label`, not from its text, and its contents are
> treated as presentational, so the visible label would not be announced.
> Reserve `role="separator"` for a divider with no meaningful text.

### Bordered Markers

A bordered marker keeps the same semantics as the default marker. The bottom border is decorative, so choose `role="status"`, `render`, or no role based on the marker's purpose.

```tsx
<Marker variant="border">
  <MarkerIcon>
    <FileTextIcon />
  </MarkerIcon>
  <MarkerContent>Opened implementation notes</MarkerContent>
</Marker>
```

### Decorative Icons

`MarkerIcon` is decorative and hidden from assistive tech with `aria-hidden`, so the adjacent `MarkerContent` carries the meaning. For an icon-only marker, provide an `aria-label` or visible text so it is not announced as empty.

```tsx
<Marker aria-label="Synced">
  <MarkerIcon>
    <CheckIcon />
  </MarkerIcon>
</Marker>
```

### Interactive Markers

When a marker links or triggers an action, render it as a real `<button>` or `<a>` with the `render` prop so it is focusable and exposes the correct role. The accessible name comes from the marker text.

<!-- ::start:only react/base -->

```tsx
<Marker render={<a href="#files" />}>
  <MarkerIcon>
    <FileTextIcon />
  </MarkerIcon>
  <MarkerContent>Explored 4 files</MarkerContent>
</Marker>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
<Marker render={(props) => <a {...props} href="#files" />}>
  <MarkerIcon>
    <FileTextIcon />
  </MarkerIcon>
  <MarkerContent>Explored 4 files</MarkerContent>
</Marker>
```

<!-- ::end:only -->

## API Reference

### Marker

The root marker element. The file also exports `markerVariants` for composing the marker styles into custom components.

| Prop        | Type                                   | Default     | Description                                      |
| ----------- | -------------------------------------- | ----------- | ------------------------------------------------ |
| `variant`   | `"default" \| "border" \| "separator"` | `"default"` | The marker layout.                               |
| `render`    | `ReactElement \| function`             | -           | Render as a different element, such as a link.   |
| `className` | `string`                               | -           | Additional classes to apply to the root element. |

### MarkerIcon

A decorative icon slot. Hidden from assistive tech with `aria-hidden`.

| Prop        | Type     | Default | Description                                   |
| ----------- | -------- | ------- | --------------------------------------------- |
| `className` | `string` | -       | Additional classes to apply to the icon slot. |

### MarkerContent

The marker text content.

| Prop        | Type     | Default | Description                                      |
| ----------- | -------- | ------- | ------------------------------------------------ |
| `className` | `string` | -       | Additional classes to apply to the content slot. |

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
