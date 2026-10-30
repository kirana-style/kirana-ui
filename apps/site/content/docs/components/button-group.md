---
title: Button Group
description: A container that groups related buttons together with consistent styling.
section: components
variants: [react/base, react/aria]
keywords: [button group, toolbar, split button, component, base, aria]
---

# Button Group

<!-- ::preview item="button-group-demo" height="564" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="button-group" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
```

```tsx
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

## Composition

Use the following composition to build a `ButtonGroup`:

```text
ButtonGroup
├── Button or Input
├── ButtonGroupSeparator
└── ButtonGroupText
```

## Accessibility

- The `ButtonGroup` component has the `role` attribute set to `group`.
- Use <Kbd>Tab</Kbd> to navigate between the buttons in the group.
- Use `aria-label` or `aria-labelledby` to label the button group.

```tsx
<ButtonGroup aria-label="Button group">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

## ButtonGroup vs ToggleGroup

- Use the `ButtonGroup` component when you want to group buttons that perform an action.
- Use the `ToggleGroup` component when you want to group buttons that toggle a state.

## Orientation

Set the `orientation` prop to change the button group layout.

<!-- ::preview item="button-group-orientation" height="360" combinations="react/base,react/aria" -->

## Size

Control the size of buttons using the `size` prop on individual buttons.

<!-- ::preview item="button-group-size" height="360" combinations="react/base,react/aria" -->

## Nested

Nest `<ButtonGroup>` components to create button groups with spacing.

<!-- ::preview item="button-group-nested" height="360" combinations="react/base,react/aria" -->

## Separator

The `ButtonGroupSeparator` component visually divides buttons within a group.

Buttons with variant `outline` do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.

<!-- ::preview item="button-group-separator" height="360" combinations="react/base,react/aria" -->

## Split

Create a split button group by adding two buttons separated by a `ButtonGroupSeparator`.

<!-- ::preview item="button-group-split" height="360" combinations="react/base,react/aria" -->

## Input

Wrap an `Input` component with buttons.

<!-- ::preview item="button-group-input" height="360" combinations="react/base,react/aria" -->

## Input Group

Wrap an `InputGroup` component to create complex input layouts.

<!-- ::preview item="button-group-input-group" height="360" combinations="react/base,react/aria" -->

## Dropdown Menu

Create a split button group with a `DropdownMenu` component.

<!-- ::preview item="button-group-dropdown" height="588" combinations="react/base,react/aria" -->

## Select

Pair with a `Select` component.

<!-- ::preview item="button-group-select" height="360" combinations="react/base,react/aria" -->

## Popover

Use with a `Popover` component.

<!-- ::preview item="button-group-popover" height="492" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="button-group-rtl" height="564" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

### ButtonGroup

The `ButtonGroup` component is a container that groups related buttons together with consistent styling.

| Prop          | Type                         | Default        |
| ------------- | ---------------------------- | -------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |

```tsx
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

Nest multiple button groups to create complex layouts with spacing. See the [nested](#nested) example for more details.

```tsx
<ButtonGroup>
  <ButtonGroup />
  <ButtonGroup />
</ButtonGroup>
```

### ButtonGroupSeparator

The `ButtonGroupSeparator` component visually divides buttons within a group.

| Prop          | Type                         | Default      |
| ------------- | ---------------------------- | ------------ |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` |

```tsx
<ButtonGroup>
  <Button>Button 1</Button>
  <ButtonGroupSeparator />
  <Button>Button 2</Button>
</ButtonGroup>
```

### ButtonGroupText

Use this component to display text within a button group.

<!-- ::start:only react/base -->

| Prop     | Type                 | Default |
| -------- | -------------------- | ------- |
| `render` | `React.ReactElement` |         |

<!-- ::end:only -->

<!-- ::start:only react/aria -->

| Prop     | Type      | Default |
| -------- | --------- | ------- |
| `render` | `boolean` | `false` |

<!-- ::end:only -->

```tsx
<ButtonGroup>
  <ButtonGroupText>Text</ButtonGroupText>
  <Button>Button</Button>
</ButtonGroup>
```

Use the `render` prop to render a custom component as the text, for example a label.

<!-- ::start:only react/base -->

```tsx
import { ButtonGroupText } from "@/components/ui/button-group"
import { Label } from "@/components/ui/label"

export function ButtonGroupTextDemo() {
  return (
    <ButtonGroup>
      <ButtonGroupText render={<Label htmlFor="name" />}>Text</ButtonGroupText>
      <Input placeholder="Type something here..." id="name" />
    </ButtonGroup>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import { ButtonGroupText } from "@/components/ui/button-group"
import { Label } from "@/components/ui/label"

export function ButtonGroupTextDemo() {
  return (
    <ButtonGroup>
      <ButtonGroupText
        render={(props) => (
          <Label {...props} htmlFor="name">
            Text
          </Label>
        )}
      />
      <Input placeholder="Type something here..." id="name" />
    </ButtonGroup>
  )
}
```

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
