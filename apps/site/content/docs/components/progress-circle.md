---
title: Progress Circle
description: How far a task has come, drawn as a ring, built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords:
  [progress, circle, ring, loading, percentage, component, kirana, primitives]
---

# Progress Circle

<!-- ::preview item="progress-circle-demo" height="360" combinations="react/kirana" -->

Progress Circle is built on the [Progress primitive](/docs/primitives/components/progress) of Kirana UI Primitives, so its role, its value and the attributes it writes are the primitive's. It draws a ring in the track's colour and over it an arc in the primary colour, as long as the value's share of the range, starting at the top and running clockwise (the other way in a right-to-left page). What it is given is drawn in the middle.

## Installation

<!-- ::installation name="progress-circle" combinations="react/kirana" -->

## Usage

```tsx
import {
  ProgressCircle,
  ProgressCircleLabel,
} from "@/components/ui/progress-circle"
```

```tsx
<ProgressCircle value={64} aria-label="Storage used">
  <ProgressCircleLabel />
</ProgressCircle>
```

## Examples

### Sizes

Use the `size` prop to change the ring's diameter and thickness.

<!-- ::preview item="progress-circle-sizes" height="360" combinations="react/kirana" -->

### Indeterminate

Give `null` as the value while how far the task has come is not known: a quarter of the ring spins. It stands still when the reader asks for less motion.

<!-- ::preview item="progress-circle-indeterminate" height="360" combinations="react/kirana" -->

### Animated

The arc moves to a new value as it changes.

<!-- ::preview item="progress-circle-animated" height="360" combinations="react/kirana" -->

## API Reference

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own. The root's other props are the primitive's: see the [Progress primitive](/docs/primitives/components/progress).

### ProgressCircle

The root, the progress bar assistive technology reads. It draws an SVG holding `ProgressCircleTrack` and `ProgressCircleIndicator`, and its children in the middle. It marks itself `data-progressing`, `data-complete` or `data-indeterminate`.

| Prop               | Type                                                           | Default     | Description                                                               |
| ------------------ | -------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `value`            | `number \| null`                                               | -           | Required. The value; `null` while how far the task has come is not known. |
| `min`              | `number`                                                       | `0`         | The start of the range.                                                   |
| `max`              | `number`                                                       | `100`       | The end of the range.                                                     |
| `size`             | `"sm" \| "default" \| "lg"`                                    | `"default"` | The ring's diameter and thickness, and the size of the text inside.       |
| `format`           | `Intl.NumberFormatOptions`                                     | -           | How the value is written; a percentage of the range by default.           |
| `locale`           | `string`                                                       | -           | The language the value is written in; the page's by default.              |
| `getAriaValueText` | `(text: string \| undefined, value: number \| null) => string` | -           | What assistive technology reads for the value.                            |
| `children`         | `ReactNode`                                                    | -           | What is drawn in the middle of the ring.                                  |
| `sx`               | `Sx`                                                           | -           | Styles merged with the root's own.                                        |

### ProgressCircleTrack

The whole range: a ring in the progress track's colour. `ProgressCircle` draws it.

| Prop | Type | Default | Description                        |
| ---- | ---- | ------- | ---------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the ring's own. |

### ProgressCircleIndicator

The filled part: an arc in the primary colour, as long as the value's share of the range. `ProgressCircle` draws it.

| Prop | Type | Default | Description                       |
| ---- | ---- | ------- | --------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the arc's own. |

### ProgressCircleLabel

The value, written as the root's `format` says (a percentage of the range by default) in figures of one width, for the middle of the ring. It writes nothing while the value is not known.

| Prop       | Type                                       | Default   | Description                                    |
| ---------- | ------------------------------------------ | --------- | ---------------------------------------------- |
| `children` | `(text: string \| undefined) => ReactNode` | the value | Draws something else, given the written value. |
| `sx`       | `Sx`                                       | -         | Styles merged with the label's own.            |
