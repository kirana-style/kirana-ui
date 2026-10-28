---
title: Kbd
description: Used to display textual user input from keyboard.
section: components
variants: [react/base, react/aria]
keywords: [kbd, keyboard, shortcut, component, base, aria]
---

# Kbd

<!-- ::preview item="kbd-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="kbd" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Kbd } from "@/components/ui/kbd"
```

```tsx
<Kbd>Ctrl</Kbd>
```

## Composition

Use the following composition to build `Kbd` and `KbdGroup`:

```text
Kbd
KbdGroup
├── Kbd
└── Kbd
```

## Group

Use the `KbdGroup` component to group keyboard keys together.

<!-- ::preview item="kbd-group" height="360" combinations="react/base,react/aria" -->

## Button

Use the `Kbd` component inside a `Button` component to display a keyboard key inside a button.

<!-- ::preview item="kbd-button" height="360" combinations="react/base,react/aria" -->

## Tooltip

You can use the `Kbd` component inside a `Tooltip` component to display a tooltip with a keyboard key.

<!-- ::preview item="kbd-tooltip" height="360" combinations="react/base,react/aria" -->

## Input Group

You can use the `Kbd` component inside a `InputGroupAddon` component to display a keyboard key inside an input group.

<!-- ::preview item="kbd-input-group" height="360" combinations="react/base,react/aria" -->

## API Reference

### Kbd

Use the `Kbd` component to display a keyboard key.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | ``      |

```tsx
<Kbd>Ctrl</Kbd>
```

### KbdGroup

Use the `KbdGroup` component to group `Kbd` components together.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | ``      |

```tsx
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>
```

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
