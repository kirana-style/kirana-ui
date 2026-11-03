---
title: Slider
description: An input where the user selects a value from within a given range.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark]
keywords: [slider, range, form, component, base, aria, ark, vue, svelte]
---

# Slider

<!-- ::preview item="slider-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Installation

<!-- ::installation name="slider" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Usage

```tsx
import { Slider } from "@/components/ui/slider"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Slider defaultValue={[33]} max={100} step={1} />
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <Slider :default-value="[33]" :max="100" :step="1" />
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<Slider defaultValue={[33]} max={100} step={1} />
```

<!-- ::end:only -->

## Range

Use an array with two values for a range slider.

<!-- ::preview item="slider-range" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Multiple Thumbs

Use an array with multiple values for multiple thumbs.

<!-- ::preview item="slider-multiple" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Vertical

Use `orientation="vertical"` for a vertical slider.

<!-- ::preview item="slider-vertical" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Controlled

<!-- ::preview item="slider-controlled" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Disabled

Use the `disabled` prop to disable the slider.

<!-- ::preview item="slider-disabled" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="slider-rtl" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Slider](https://base-ui.com/react/components/slider#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Slider](https://react-aria.adobe.com/Slider#api) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Slider](https://ark-ui.com/vue/docs/components/slider#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Slider](https://ark-ui.com/svelte/docs/components/slider#api-reference) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
