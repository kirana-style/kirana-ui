---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark]
keywords:
  [progress, progress bar, loading, component, base, aria, ark, vue, svelte]
---

# Progress

<!-- ::preview item="progress-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Installation

<!-- ::installation name="progress" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Usage

```tsx
import { Progress } from "@/components/ui/progress"
```

<!-- ::start:only react/base -->

```tsx
<Progress value={33} />
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
<Progress aria-label="Loading" value={33} />
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <Progress :value="33" />
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<Progress value={33} />
```

<!-- ::end:only -->

## Composition

### With label and value

Use `ProgressLabel` and `ProgressValue` to add a label and value display.

```tsx
import { css } from "@kirana-style/core"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

const styles = {
  progress: css({ width: "100%", maxWidth: "24rem" }),
}

;<Progress value={56} sx={styles.progress}>
  <ProgressLabel>Upload progress</ProgressLabel>
  <ProgressValue />
</Progress>
```

```text
Progress
├── ProgressLabel
├── ProgressValue
└── ProgressTrack
    └── ProgressIndicator
```

## Label

Use `ProgressLabel` and `ProgressValue` to add a label and value display.

<!-- ::preview item="progress-label" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Controlled

A progress bar that can be controlled by a slider.

<!-- ::preview item="progress-controlled" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="progress-rtl" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Progress](https://base-ui.com/react/components/progress#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria ProgressBar](https://react-aria.adobe.com/ProgressBar#api) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Progress (Linear)](https://ark-ui.com/vue/docs/components/progress-linear#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Progress (Linear)](https://ark-ui.com/svelte/docs/components/progress-linear#api-reference) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
