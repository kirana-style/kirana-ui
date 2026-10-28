---
title: Slider
description: An input where the user selects a value from within a given range.
section: components
variants: [react/base, react/aria]
keywords: [slider, range, form, component, base, aria]
---

# Slider

<!-- ::preview item="slider-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="slider" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Slider } from "@/components/ui/slider"
```

```tsx
<Slider defaultValue={[33]} max={100} step={1} />
```

## Range

Use an array with two values for a range slider.

<!-- ::preview item="slider-range" height="360" combinations="react/base,react/aria" -->

## Multiple Thumbs

Use an array with multiple values for multiple thumbs.

<!-- ::preview item="slider-multiple" height="360" combinations="react/base,react/aria" -->

## Vertical

Use `orientation="vertical"` for a vertical slider.

<!-- ::preview item="slider-vertical" height="360" combinations="react/base,react/aria" -->

## Controlled

<!-- ::preview item="slider-controlled" height="360" combinations="react/base,react/aria" -->

## Disabled

Use the `disabled` prop to disable the slider.

<!-- ::preview item="slider-disabled" height="360" combinations="react/base,react/aria" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Slider](https://base-ui.com/react/components/slider#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Slider](https://react-aria.adobe.com/Slider#api) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
