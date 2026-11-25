---
title: Color Picker
description: Chooses a colour on a field, a hue slider and an input, in a popover or inline, built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords:
  [
    color,
    colour,
    picker,
    hue,
    alpha,
    swatch,
    hex,
    form,
    component,
    kirana,
    primitives,
  ]
---

# Color Picker

<!-- ::preview item="color-picker-demo" height="460" combinations="react/kirana" -->

Color Picker is built on the [Color Picker primitive](/docs/primitives/components/color-picker) of Kirana UI Primitives. Its trigger is an outline [Button](/docs/components/button) showing a swatch of the colour and its text; pressed, it opens a [Popover](/docs/components/popover) holding the picker: a field for the saturation and brightness, a hue slider, an alpha slider when the colour has one, and a hex input. Its sliders are drawn as the [Slider](/docs/components/slider)'s, its inputs as the [Input](/docs/components/input)'s. The parts can also be written straight inside the root, for a picker drawn inline.

## Installation

<!-- ::installation name="color-picker" combinations="react/kirana" -->

## Usage

```tsx
import { ColorPicker } from "@/components/ui/color-picker"
```

```tsx
<ColorPicker defaultValue="#2563eb" />
```

Given no children, `ColorPicker` draws a `ColorPickerTrigger` and a `ColorPickerContent`, and the content draws the field, the hue slider (and the alpha one with `alpha`), the hex input and the eye dropper. Write the parts yourself to choose what the popup holds:

```tsx
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControls,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerTrigger,
} from "@/components/ui/color-picker"
```

```tsx
<ColorPicker defaultValue="#2563eb">
  <ColorPickerTrigger />
  <ColorPickerContent>
    <ColorPickerArea />
    <ColorPickerSlider channel="hue" />
    <ColorPickerControls>
      <ColorPickerInput channel="hex" />
    </ColorPickerControls>
  </ColorPickerContent>
</ColorPicker>
```

## Examples

### Inline

The parts written straight inside `ColorPicker`, with no trigger and no content, draw the picker in the page.

<!-- ::preview item="color-picker-inline" height="420" combinations="react/kirana" -->

### Alpha

With `alpha`, the opacity can be chosen too, on a slider over a checkerboard or in the `alpha` input, and the value carries it (`#rrggbbaa`). `ColorPickerFormatTrigger` writes the colour as hex, then rgb, then hsl.

<!-- ::preview item="color-picker-alpha" height="500" combinations="react/kirana" -->

### Swatches

`ColorPickerSwatches` draws a preset for each of its `values`; the one that is the colour now is ringed.

<!-- ::preview item="color-picker-swatches" height="520" combinations="react/kirana" -->

### In a form

With a `name`, the colour is sent with the form around the picker. Here it is in a `Field`, its label naming the trigger.

<!-- ::preview item="color-picker-form" height="460" combinations="react/kirana" -->

## API Reference

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own. The other props are the primitive's: see the [Color Picker primitive](/docs/primitives/components/color-picker).

### ColorPicker

The root: it holds the colour, the hidden input a form reads, and a Popover for the trigger and the content. Given no children, it draws a `ColorPickerTrigger` and a `ColorPickerContent`. With the picker's parts written straight inside it, it lays them out in a column.

| Prop               | Type                                                    | Default     | Description                                                       |
| ------------------ | ------------------------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `value`            | `string`                                                | -           | The colour, when the caller holds it. Any format is read.         |
| `defaultValue`     | `string`                                                | `"#000000"` | The colour at first, when the caller does not hold it.            |
| `onValueChange`    | `(value: string, details: ChangeDetails) => void`       | -           | Called at each step of a drag, each key, each colour typed.       |
| `onValueCommitted` | `(value: string, details: ChangeDetails) => void`       | -           | Called when the pointer lets go, after a key, when an input left. |
| `format`           | `"hex" \| "rgb" \| "hsl"`                               | -           | How the value is written, when the caller holds it.               |
| `defaultFormat`    | `"hex" \| "rgb" \| "hsl"`                               | `"hex"`     | How it is written at first.                                       |
| `onFormatChange`   | `(format: ColorFormat, details: ChangeDetails) => void` | -           | Called when the format trigger goes to the next format.           |
| `alpha`            | `boolean`                                               | `false`     | Whether the opacity can be chosen; the value then carries it.     |
| `thumbAlignment`   | `"center" \| "edge"`                                    | `"edge"`    | Where a thumb is at the ends of its range: inside, or half out.   |
| `open`             | `boolean`                                               | -           | Whether the popover is open, when the caller holds it.            |
| `defaultOpen`      | `boolean`                                               | `false`     | Whether it starts open.                                           |
| `onOpenChange`     | `(open: boolean, details: ChangeDetails) => void`       | -           | Called as the popover is about to open or close.                  |
| `name`             | `string`                                                | -           | The name the colour is sent under with its form.                  |
| `disabled`         | `boolean`                                               | `false`     | Whether it cannot be changed.                                     |
| `readOnly`         | `boolean`                                               | `false`     | Whether it is shown and focusable, but cannot be changed.         |
| `sx`               | `Sx`                                                    | -           | Styles merged with the root's own.                                |

### ColorPickerTrigger

An outline Button that opens the popover. Given no children, it draws a `ColorPickerSwatch` and the colour's text.

| Prop       | Type        | Default              | Description                          |
| ---------- | ----------- | -------------------- | ------------------------------------ |
| `children` | `ReactNode` | a swatch and a value | What the button draws.               |
| `sx`       | `Sx`        | -                    | Styles merged with the button's own. |

### ColorPickerContent

The popover's popup, the registry's Popover surface. Given no children, it draws a `ColorPickerArea`, a hue `ColorPickerSlider` (and an alpha one with `alpha`), and `ColorPickerControls` holding a hex `ColorPickerInput` and a `ColorPickerEyeDropper`.

| Prop          | Type                           | Default           | Description                                |
| ------------- | ------------------------------ | ----------------- | ------------------------------------------ |
| `aria-label`  | `string`                       | `"Colour picker"` | What assistive technology calls the popup. |
| `side`        | `Side`                         | `"bottom"`        | The side of the trigger it opens on.       |
| `align`       | `"start" \| "center" \| "end"` | `"center"`        | Where along that side it is.               |
| `sideOffset`  | `number`                       | `4`               | The gap from the trigger, in pixels.       |
| `alignOffset` | `number`                       | `0`               | How far it is moved along the side.        |
| `sx`          | `Sx`                           | -                 | Styles merged with the popup's own.        |

### ColorPickerArea

The field a pointer drags on: saturation across, the way the text runs, and brightness up, over the colour's hue. It draws a `ColorPickerAreaThumb` unless given children.

| Prop | Type | Default | Description                        |
| ---- | ---- | ------- | ---------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the area's own. |

### ColorPickerAreaThumb

What is dragged in the area, and what the arrow keys move: a white ring around the colour under it.

| Prop         | Type     | Default    | Description                                |
| ------------ | -------- | ---------- | ------------------------------------------ |
| `aria-label` | `string` | `"Colour"` | What assistive technology calls the thumb. |
| `sx`         | `Sx`     | -          | Styles merged with the thumb's own.        |

### ColorPickerSlider

A channel's slider: the hues, or the colour from clear to whole over a checkerboard. It draws a `ColorPickerSliderTrack` holding a `ColorPickerSliderThumb` (named "Hue" or "Alpha") unless given children.

| Prop          | Type                         | Default        | Description                          |
| ------------- | ---------------------------- | -------------- | ------------------------------------ |
| `channel`     | `"hue" \| "alpha"`           | -              | Required. The channel it moves.      |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | The way its track runs.              |
| `sx`          | `Sx`                         | -              | Styles merged with the slider's own. |

### ColorPickerSliderTrack

The channel's whole range, the size of the Slider's track.

| Prop | Type | Default | Description                         |
| ---- | ---- | ------- | ----------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the track's own. |

### ColorPickerSliderThumb

What is dragged on the track, the Slider's thumb filled with the colour under it.

| Prop | Type | Default | Description                         |
| ---- | ---- | ------- | ----------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the thumb's own. |

### ColorPickerInput

A text input for one channel, or `hex` for the whole colour, with the Input's look. What is typed is taken when it is a colour or a number in range.

| Prop         | Type                                                                                     | Default            | Description                                |
| ------------ | ---------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------ |
| `channel`    | `"hex" \| "red" \| "green" \| "blue" \| "hue" \| "saturation" \| "lightness" \| "alpha"` | -                  | Required. The channel it is typed in.      |
| `aria-label` | `string`                                                                                 | the channel's name | What assistive technology calls the input. |
| `sx`         | `Sx`                                                                                     | -                  | Styles merged with the input's own.        |

### ColorPickerSwatch

The colour now, over a checkerboard.

| Prop | Type | Default | Description                          |
| ---- | ---- | ------- | ------------------------------------ |
| `sx` | `Sx` | -       | Styles merged with the swatch's own. |

### ColorPickerSwatches

A row of presets that wraps. It draws a `ColorPickerSwatchTrigger` for each of `values` unless given children.

| Prop     | Type                | Default | Description                       |
| -------- | ------------------- | ------- | --------------------------------- |
| `values` | `readonly string[]` | -       | The presets' colours.             |
| `sx`     | `Sx`                | -       | Styles merged with the row's own. |

### ColorPickerSwatchTrigger

A preset: pressed, the colour is this one. It is ringed while it is the colour now.

| Prop         | Type     | Default   | Description                                 |
| ------------ | -------- | --------- | ------------------------------------------- |
| `value`      | `string` | -         | Required. The preset's colour, any format.  |
| `aria-label` | `string` | its value | What assistive technology calls the preset. |
| `sx`         | `Sx`     | -         | Styles merged with the preset's own.        |

### ColorPickerEyeDropper

A ghost icon Button that picks a colour from the screen with the browser's eye dropper. It is hidden where the browser has none.

| Prop       | Type        | Default   | Description                          |
| ---------- | ----------- | --------- | ------------------------------------ |
| `children` | `ReactNode` | a pipette | What the button draws.               |
| `sx`       | `Sx`        | -         | Styles merged with the button's own. |

### ColorPickerFormatTrigger

A ghost icon Button that writes the colour in the next format: hex, then rgb, then hsl.

| Prop       | Type        | Default | Description                          |
| ---------- | ----------- | ------- | ------------------------------------ |
| `children` | `ReactNode` | arrows  | What the button draws.               |
| `sx`       | `Sx`        | -       | Styles merged with the button's own. |

### ColorPickerValue

The colour, written in its format.

| Prop | Type | Default | Description                        |
| ---- | ---- | ------- | ---------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the text's own. |

### ColorPickerControls

A row for the picker's controls: a swatch, an input, an icon button.

| Prop | Type | Default | Description                       |
| ---- | ---- | ------- | --------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the row's own. |
