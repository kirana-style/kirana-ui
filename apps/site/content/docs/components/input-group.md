---
title: Input Group
description: Add addons, buttons, and helper content to inputs.
section: components
variants: [react/base, react/aria]
keywords: [input group, input, addon, form, component, base, aria]
---

# Input Group

import { IconInfoCircle } from "@tabler/icons-react"

<!-- ::preview item="input-group-demo" height="416" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="input-group" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
```

```tsx
<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

## Composition

Use the following composition to build an `InputGroup`:

```text
InputGroup
├── InputGroupInput or InputGroupTextarea
├── InputGroupAddon
├── InputGroupButton
└── InputGroupText
```

## Align

Use the `align` prop on `InputGroupAddon` to position the addon relative to the input.

> [!NOTE]
> For proper focus management, `InputGroupAddon` should always be placed after
> `InputGroupInput` or `InputGroupTextarea` in the DOM. Use the `align` prop to
> visually position the addon.

### inline-start

Use `align="inline-start"` to position the addon at the start of the input. This is the default.

<!-- ::preview item="input-group-inline-start" height="360" combinations="react/base,react/aria" -->

### inline-end

Use `align="inline-end"` to position the addon at the end of the input.

<!-- ::preview item="input-group-inline-end" height="360" combinations="react/base,react/aria" -->

### block-start

Use `align="block-start"` to position the addon above the input.

<!-- ::preview item="input-group-block-start" height="360" combinations="react/base,react/aria" -->

### block-end

Use `align="block-end"` to position the addon below the input.

<!-- ::preview item="input-group-block-end" height="416" combinations="react/base,react/aria" -->

## Icon

<!-- ::preview item="input-group-icon" height="360" combinations="react/base,react/aria" -->

## Text

<!-- ::preview item="input-group-text" height="360" combinations="react/base,react/aria" -->

## Kbd

<!-- ::preview item="input-group-kbd" height="360" combinations="react/base,react/aria" -->

## Dropdown

<!-- ::preview item="input-group-dropdown" height="360" combinations="react/base,react/aria" -->

## Spinner

<!-- ::preview item="input-group-spinner" height="360" combinations="react/base,react/aria" -->

## Textarea

<!-- ::preview item="input-group-textarea" height="360" combinations="react/base,react/aria" -->

## API Reference

### InputGroup

The main component that wraps inputs and addons.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` |         |

```tsx
<InputGroup>
  <InputGroupInput />
  <InputGroupAddon />
</InputGroup>
```

### InputGroupAddon

Displays icons, text, buttons, or other content alongside inputs.

> [!NOTE] Focus navigation
> For proper focus navigation, the `InputGroupAddon` component should be placed
> after the input. Set the `align` prop to position the addon.

| Prop    | Type                                                             | Default          |
| ------- | ---------------------------------------------------------------- | ---------------- |
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` |
| `sx`    | `Sx`                                                             |                  |

```tsx
<InputGroupAddon align="inline-end">
  <SearchIcon />
</InputGroupAddon>
```

**For `<InputGroupInput />`, use the `inline-start` or `inline-end` alignment. For `<InputGroupTextarea />`, use the `block-start` or `block-end` alignment.**

The `InputGroupAddon` component can have multiple `InputGroupButton` components and icons.

```tsx
<InputGroupAddon>
  <InputGroupButton>Button</InputGroupButton>
  <InputGroupButton>Button</InputGroupButton>
</InputGroupAddon>
```

### InputGroupButton

Displays buttons within input groups.

| Prop      | Type                                                                          | Default   |
| --------- | ----------------------------------------------------------------------------- | --------- |
| `size`    | `"xs" \| "icon-xs" \| "sm" \| "icon-sm"`                                      | `"xs"`    |
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"ghost"` |
| `sx`      | `Sx`                                                                          |           |

```tsx
<InputGroupButton>Button</InputGroupButton>
<InputGroupButton size="icon-xs" aria-label="Copy">
  <CopyIcon />
</InputGroupButton>
```

### InputGroupInput

Replacement for `<Input />` when building input groups. This component has the input group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` |         |

All other props are passed through to the underlying `<Input />` component.

```tsx
<InputGroup>
  <InputGroupInput placeholder="Enter text..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

### InputGroupTextarea

Replacement for `<Textarea />` when building input groups. This component has the textarea group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` |         |

All other props are passed through to the underlying `<Textarea />` component.

```tsx
<InputGroup>
  <InputGroupTextarea placeholder="Enter message..." />
  <InputGroupAddon align="block-end">
    <InputGroupButton>Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
