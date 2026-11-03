---
title: Aspect Ratio
description: Displays content within a desired ratio.
section: components
variants: [react/base, react/aria, vue/ark]
keywords: [aspect ratio, image, ratio, component, base, aria, ark, vue]
---

# Aspect Ratio

<!-- ::preview item="aspect-ratio-demo" height="360" combinations="react/base,react/aria,vue/ark" -->

## Installation

<!-- ::installation name="aspect-ratio" combinations="react/base,react/aria,vue/ark" -->

## Usage

```tsx
import { css } from "@kirana-style/core"

import { AspectRatio } from "@/components/ui/aspect-ratio"

const styles = {
  image: css({ borderRadius: "0.375rem", objectFit: "cover" }),
}
```

<!-- ::start:only react/base,react/aria -->

```tsx
<AspectRatio ratio={16 / 9}>
  <img src="..." alt="Image" sx={styles.image} />
</AspectRatio>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <AspectRatio :ratio="16 / 9">
    <img src="..." alt="Image" :sx="styles.image" />
  </AspectRatio>
</template>
```

<!-- ::end:only -->

## Square

A square aspect ratio component using the `ratio={1 / 1}` prop. This is useful for displaying images in a square format.

<!-- ::preview item="aspect-ratio-square" height="360" combinations="react/base,react/aria,vue/ark" -->

## Portrait

A portrait aspect ratio component using the `ratio={9 / 16}` prop. This is useful for displaying images in a portrait format.

<!-- ::preview item="aspect-ratio-portrait" height="360" combinations="react/base,react/aria,vue/ark" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="aspect-ratio-rtl" height="384" combinations="react/base,react/aria,vue/ark" direction="rtl" -->

## API Reference

### AspectRatio

The `AspectRatio` component displays content within a desired ratio.

| Prop    | Type     | Default | Required |
| ------- | -------- | ------- | -------- |
| `ratio` | `number` | -       | Yes      |
| `sx`    | `Sx`     | -       | No       |

<!-- ::start:only react/base -->

For more information, see the [Base UI documentation](https://base-ui.com/react/components/aspect-ratio#api-reference).

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
