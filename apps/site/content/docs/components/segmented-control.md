---
title: Segmented Control
description: One value chosen from a few, always one chosen, built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords:
  [
    segmented control,
    segmented,
    switch,
    view,
    toggle group,
    component,
    kirana,
    primitives,
  ]
---

# Segmented Control

<!-- ::preview item="segmented-control-demo" height="360" combinations="react/kirana" -->

Segmented Control is built on the [Toggle Group primitive](/docs/primitives/components/toggle-group) of Kirana UI Primitives, holding one value that cannot be emptied: pressing the chosen item again keeps it chosen. It looks like the default list of [Tabs](/docs/components/tabs) in every style, the chosen item on an inset surface, and the arrow keys move between its items.

## Installation

<!-- ::installation name="segmented-control" combinations="react/kirana" -->

## Usage

```tsx
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control"
```

```tsx
<SegmentedControl defaultValue="list" aria-label="View">
  <SegmentedControlItem value="list">List</SegmentedControlItem>
  <SegmentedControlItem value="board">Board</SegmentedControlItem>
  <SegmentedControlItem value="calendar">Calendar</SegmentedControlItem>
</SegmentedControl>
```

## Examples

### Icons

An item holds text, an icon, or both. An item with an icon alone needs an `aria-label`.

<!-- ::preview item="segmented-control-icons" height="360" combinations="react/kirana" -->

### Sizes

Use the `size` prop to change the height of the control and the size of its items.

<!-- ::preview item="segmented-control-sizes" height="360" combinations="react/kirana" -->

### Disabled

Use `disabled` on an item to keep it from being chosen, or on the control to disable every item.

<!-- ::preview item="segmented-control-disabled" height="360" combinations="react/kirana" -->

### Controlled

Hold the value with `value` and `onValueChange` to show what is chosen elsewhere. The toggle group submits no value of its own, so a form reads the value you hold.

<!-- ::preview item="segmented-control-form" height="360" combinations="react/kirana" -->

## API Reference

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own. The other props are the primitive's: see the [Toggle Group primitive](/docs/primitives/components/toggle-group).

### SegmentedControl

The root, a group of toggles holding one value. Pressing the chosen item again is refused, so one item stays chosen.

| Prop            | Type                        | Default     | Description                                                          |
| --------------- | --------------------------- | ----------- | -------------------------------------------------------------------- |
| `size`          | `"sm" \| "default" \| "lg"` | `"default"` | The height of the control and the size of its items.                 |
| `value`         | `Value`                     | -           | The chosen item's value, when the caller holds it.                   |
| `defaultValue`  | `Value`                     | -           | The item chosen at the start, when the caller does not hold `value`. |
| `onValueChange` | `(value: Value) => void`    | -           | Called when another item is chosen, with its value.                  |
| `disabled`      | `boolean`                   | `false`     | Whether every item is disabled.                                      |
| `loopFocus`     | `boolean`                   | `true`      | Whether the arrow keys go round from the last item to the first.     |
| `sx`            | `Sx`                        | -           | Styles merged with the root's own.                                   |

### SegmentedControlItem

One choice, a toggle button.

| Prop       | Type        | Default | Description                                       |
| ---------- | ----------- | ------- | ------------------------------------------------- |
| `value`    | `unknown`   | -       | Required. The control's value while it is chosen. |
| `disabled` | `boolean`   | `false` | Whether it cannot be chosen.                      |
| `children` | `ReactNode` | -       | Its text, its icon, or both.                      |
| `sx`       | `Sx`        | -       | Styles merged with the item's own.                |
