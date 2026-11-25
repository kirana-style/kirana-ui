---
title: Time Field
description: A time typed part by part, hours, minutes and the day period, built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords:
  [time, field, hour, minute, clock, form, component, kirana, primitives]
---

# Time Field

<!-- ::preview item="time-field-demo" height="360" combinations="react/kirana" -->

Time Field is built on the [Time Field primitive](/docs/primitives/components/time-field) of Kirana UI Primitives. It looks like an [Input](/docs/components/input) and holds the time's segments: the hour, the minute, the second if asked for, and the day period on a clock of twelve hours. Each segment is typed or stepped with the arrow keys, and the left and right arrows move between them; the focused one is highlighted.

## Installation

<!-- ::installation name="time-field" combinations="react/kirana" -->

## Usage

```tsx
import { TimeField } from "@/components/ui/time-field"
```

```tsx
<TimeField locale="en-US" aria-label="Start time" />
```

The value is an ISO time in 24 hours (`"14:30"`, `"14:30:05"`), or `null` until all of it is typed. Give `locale`: it orders the segments and chooses the clock, and a server does not know the reader's.

## Examples

### Seconds

Use `granularity="second"` to type the seconds too.

<!-- ::preview item="time-field-seconds" height="360" combinations="react/kirana" -->

### 24-hour clock

Use `hourCycle` to choose a clock of 12 or 24 hours, whatever the locale's is. With 24 there is no day period.

<!-- ::preview item="time-field-24-hour" height="360" combinations="react/kirana" -->

### Disabled

Use `disabled` to stop the time being changed or focused.

<!-- ::preview item="time-field-disabled" height="360" combinations="react/kirana" -->

### In a form

With a `name`, the time is submitted with the form around it by a hidden input, empty until all of it is typed. `min` and `max` mark a time outside them invalid, and the field is drawn red while it is.

<!-- ::preview item="time-field-form" height="480" combinations="react/kirana" -->

### Labelling

The field is a group, which a `<label for>` does not name. Name it with `aria-labelledby`, pointing at the label's `id`, or with `aria-label`.

```tsx
<Field>
  <FieldLabel id="start-label">Starts at</FieldLabel>
  <TimeField locale="en-US" aria-labelledby="start-label" />
</Field>
```

### Composing the parts

`TimeField` draws its segments and its hidden input when it is given no children. Write them yourself to style a segment.

```tsx
import {
  TimeField,
  TimeFieldInput,
  TimeFieldSegment,
  TimeFieldSegments,
} from "@/components/ui/time-field"
```

```tsx
<TimeField locale="en-US" aria-label="Start time">
  <TimeFieldSegments>
    {(segment) => <TimeFieldSegment segment={segment} />}
  </TimeFieldSegments>
  <TimeFieldInput />
</TimeField>
```

## API Reference

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own. The other props are the primitive's: see the [Time Field primitive](/docs/primitives/components/time-field).

### TimeField

The field, a group drawn as an Input: it draws its segments and its hidden input unless given children.

| Prop            | Type                                                      | Default                    | Description                                                                |
| --------------- | --------------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------- |
| `value`         | `string \| null`                                          | -                          | The time, `HH:MM` or `HH:MM:SS` in 24 hours, when the caller holds it.     |
| `defaultValue`  | `string \| null`                                          | -                          | The time it starts with, when the caller does not hold `value`.            |
| `onValueChange` | `(value: string \| null, details: ChangeDetails) => void` | -                          | Called as the time is about to change, once all of it is typed or cleared. |
| `granularity`   | `"minute" \| "second"`                                    | `"minute"`                 | The smallest segment typed.                                                |
| `locale`        | `string`                                                  | `"en-US"`                  | Orders the segments, puts what stands between them and chooses the clock.  |
| `hourCycle`     | `12 \| 24`                                                | the locale's               | A clock of 12 hours and a day period, or of 24.                            |
| `min`           | `string`                                                  | -                          | The first time it takes: before it, the field is invalid.                  |
| `max`           | `string`                                                  | -                          | The last time it takes.                                                    |
| `placeholders`  | `Partial<Record<TimeUnit, string>>`                       | `hh`, `mm`, `ss`, `--`     | What an empty segment shows.                                               |
| `disabled`      | `boolean`                                                 | `false`                    | Whether the time cannot be changed or focused.                             |
| `readOnly`      | `boolean`                                                 | `false`                    | Whether the time is shown and focusable, but cannot be changed.            |
| `required`      | `boolean`                                                 | `false`                    | Whether a time is needed.                                                  |
| `name`          | `string`                                                  | -                          | The name the time is submitted under.                                      |
| `form`          | `string`                                                  | -                          | The id of the form the time belongs to, when it is not inside it.          |
| `children`      | `ReactNode`                                               | the segments and the input | Parts of your own.                                                         |
| `sx`            | `Sx`                                                      | -                          | Styles merged with the field's own.                                        |

### TimeFieldSegments

The time's segments, in the locale's order. It draws no element.

| Prop       | Type                                       | Default              | Description                       |
| ---------- | ------------------------------------------ | -------------------- | --------------------------------- |
| `children` | `(segment: TimeFieldSegment) => ReactNode` | a `TimeFieldSegment` | Draws one segment, once for each. |

### TimeFieldSegment

One segment: a part that is typed (`hour`, `minute`, `second`, `dayPeriod`), highlighted while it has focus and drawn in the muted colour while empty, or the text between two.

| Prop      | Type               | Default | Description                                                   |
| --------- | ------------------ | ------- | ------------------------------------------------------------- |
| `segment` | `TimeFieldSegment` | -       | Required. The segment it is, as `TimeFieldSegments` gives it. |
| `sx`      | `Sx`               | -       | Styles merged with the segment's own.                         |

### TimeFieldInput

The hidden input the time is submitted by, with `name` and `form` from the field. It takes what an `<input>` takes.
