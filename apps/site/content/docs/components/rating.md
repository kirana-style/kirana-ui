---
title: Rating
description: A score chosen from a row of stars, whole or by halves, built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords: [rating, stars, score, review, form, component, kirana, primitives]
---

# Rating

<!-- ::preview item="rating-demo" height="360" combinations="react/kirana" -->

Rating is built on the [Rating primitive](/docs/primitives/components/rating) of Kirana UI Primitives. It draws its own stars from `count`, and the keys move between them as in a radio group.

## Installation

<!-- ::installation name="rating" combinations="react/kirana" -->

## Usage

```tsx
import { Rating } from "@/components/ui/rating"
```

```tsx
<Rating defaultValue={3} aria-label="Rating" />
```

## Examples

### Half stars

Use `allowHalf` to give half a star, by the half of a star the pointer is over or with the arrow keys.

<!-- ::preview item="rating-half" height="360" combinations="react/kirana" -->

### Sizes

Use the `size` prop to change the size of the stars.

<!-- ::preview item="rating-sizes" height="360" combinations="react/kirana" -->

### Read only

Use `readOnly` to show a score that cannot be changed. The stars can still be focused.

<!-- ::preview item="rating-readonly" height="360" combinations="react/kirana" -->

### In a form

With a `name`, the value is submitted with the form around it, and empty when no star is given.

<!-- ::preview item="rating-form" height="480" combinations="react/kirana" -->

### Your own icon

`Rating` takes the stars as its children when they are given: draw each with `RatingItem` inside `RatingItems`, whose child is called once for each place. An item's children are its icon, drawn empty and filled over it.

```tsx
import { Rating, RatingItem, RatingItems } from "@/components/ui/rating"
```

```tsx
<Rating defaultValue={4} aria-label="Rating">
  <RatingItems>
    {(place) => (
      <RatingItem place={place}>
        <HeartIcon />
      </RatingItem>
    )}
  </RatingItems>
</Rating>
```

## API Reference

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own. The other props are the primitive's: see the [Rating primitive](/docs/primitives/components/rating).

### Rating

The root, a radio group: it draws a star for each place from 1 to `count` unless given children, and holds the hidden input a form reads.

| Prop            | Type                                              | Default     | Description                                                         |
| --------------- | ------------------------------------------------- | ----------- | ------------------------------------------------------------------- |
| `size`          | `"sm" \| "default" \| "lg"`                       | `"default"` | The size of the stars and the gap between them.                     |
| `value`         | `number`                                          | -           | The score, from 0 (none) to `count`, when the caller holds it.      |
| `defaultValue`  | `number`                                          | `0`         | The score it starts with, when the caller does not hold `value`.    |
| `onValueChange` | `(value: number, details: ChangeDetails) => void` | -           | Called as another score is about to be given.                       |
| `onHoverChange` | `(value: number \| null) => void`                 | -           | Called with the score the pointer is over, and `null` as it leaves. |
| `count`         | `number`                                          | `5`         | How many stars there are.                                           |
| `allowHalf`     | `boolean`                                         | `false`     | Whether half a star can be given.                                   |
| `disabled`      | `boolean`                                         | `false`     | Whether the score cannot be changed or focused.                     |
| `readOnly`      | `boolean`                                         | `false`     | Whether the score is shown and focusable, but cannot be changed.    |
| `required`      | `boolean`                                         | `false`     | Whether a score is needed.                                          |
| `name`          | `string`                                          | -           | The name the score is submitted under.                              |
| `form`          | `string`                                          | -           | The id of the form the score belongs to, when it is not inside it.  |
| `children`      | `ReactNode`                                       | -           | Stars of your own, in place of the ones drawn from `count`.         |
| `sx`            | `Sx`                                              | -           | Styles merged with the root's own.                                  |

### RatingItems

Draws its child once for each place, from 1 to `count`. It draws no element.

| Prop       | Type                           | Default | Description                 |
| ---------- | ------------------------------ | ------- | --------------------------- |
| `children` | `(place: number) => ReactNode` | -       | Draws one star, at `place`. |

### RatingItem

One star, a radio. Its icon is drawn twice: empty in the muted text colour, and filled in the foreground over it, whole on a filled star and by half on a half one.

| Prop       | Type        | Default | Description                        |
| ---------- | ----------- | ------- | ---------------------------------- |
| `place`    | `number`    | -       | Required. Its place, from 1.       |
| `children` | `ReactNode` | a star  | The icon it draws.                 |
| `sx`       | `Sx`        | -       | Styles merged with the star's own. |
