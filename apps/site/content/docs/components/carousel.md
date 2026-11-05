---
title: Carousel
description: A carousel with motion and swipe built using Embla.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords:
  [
    carousel,
    slider,
    slides,
    embla,
    component,
    base,
    aria,
    ark,
    vue,
    svelte,
    solid,
  ]
---

# Carousel

<!-- ::preview item="carousel-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## About

The carousel component is built using the [Embla Carousel](https://www.embla-carousel.com/) library.

## Installation

<!-- ::installation name="carousel" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Usage

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

@Component({
  selector: "app-example",
  imports: [
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  ],
  template: `
    <div kuiCarousel>
      <div kuiCarouselContent>
        <div kuiCarouselItem>...</div>
        <div kuiCarouselItem>...</div>
        <div kuiCarouselItem>...</div>
      </div>
      <button kuiCarouselPrevious></button>
      <button kuiCarouselNext></button>
    </div>
  `,
})
export class Example {}
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `Carousel`:

```text
Carousel
├── CarouselContent
│   ├── CarouselItem
│   └── CarouselItem
├── CarouselPrevious
└── CarouselNext
```

## Sizes

To set the size of the items, give the `<CarouselItem />` a `flexBasis` through `sx`.

<!-- ::preview item="carousel-size" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

```tsx
// 33% of the carousel width.
const third = css({ flexBasis: "calc(100% / 3)" })

<Carousel>
  <CarouselContent>
    <CarouselItem sx={third}>...</CarouselItem>
    <CarouselItem sx={third}>...</CarouselItem>
    <CarouselItem sx={third}>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

```tsx
// 50% on small screens and 33% on larger screens.
const item = css({
  flexBasis: { [breakpoint.md]: "50%", [breakpoint.lg]: "calc(100% / 3)" },
})
```

## Spacing

To set the spacing between the items, give the `<CarouselItem />` a `paddingLeft` and the
`<CarouselContent />` the same negative `marginLeft`.

<!-- ::preview item="carousel-spacing" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

```tsx
const content = css({ marginLeft: `calc(${space[2]} * -1)` })
const item = css({ paddingLeft: space[2] })

<Carousel>
  <CarouselContent sx={content}>
    <CarouselItem sx={item}>...</CarouselItem>
    <CarouselItem sx={item}>...</CarouselItem>
    <CarouselItem sx={item}>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

## Orientation

Use the `orientation` prop to set the orientation of the carousel.

<!-- ::preview item="carousel-orientation" height="420" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

```tsx
<Carousel orientation="vertical | horizontal">
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

## Options

You can pass options to the carousel using the `opts` prop. See the
[Embla Carousel docs](https://www.embla-carousel.com/api/options/) for more information.

<!-- ::start:only react/base,react/aria -->

```tsx
<Carousel
  opts={{
    align: "start",
    loop: true,
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <Carousel :opts="{ align: 'start', loop: true }">
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<Carousel opts={{ align: 'start', loop: true }}>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
<Carousel opts={{ align: "start", loop: true }}>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

<!-- ::end:only -->

## API

Use a state and the `setApi` prop to get an instance of the carousel API.

<!-- ::preview item="carousel-api" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

<!-- ::start:only react/base,react/aria -->

```tsx
import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<script setup lang="ts">
import { ref } from "vue"

import { type CarouselApi } from "@/components/ui/carousel"

const current = ref(0)
const count = ref(0)

function setApi(api: CarouselApi) {
  count.value = api.scrollSnapList().length
  current.value = api.selectedScrollSnap() + 1
  api.on("select", () => {
    current.value = api.selectedScrollSnap() + 1
  })
}
</script>

<template>
  <Carousel :set-api="setApi">
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<script lang="ts">
  import { type CarouselApi } from "@/components/ui/carousel"

  let current = $state(0)
  let count = $state(0)

  function setApi(api: CarouselApi) {
    count = api.scrollSnapList().length
    current = api.selectedScrollSnap() + 1
    api.on("select", () => {
      current = api.selectedScrollSnap() + 1
    })
  }
</script>

<Carousel setApi={setApi}>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
import { createSignal } from "solid-js"
import { CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [current, setCurrent] = createSignal(0)
  const [count, setCount] = createSignal(0)

  function setApi(api: CarouselApi) {
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
```

<!-- ::end:only -->

## Events

You can listen to events using the api instance from `setApi`.

<!-- ::start:only react/base,react/aria -->

```tsx
import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      // Do something on select.
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<script setup lang="ts">
import { type CarouselApi } from "@/components/ui/carousel"

function setApi(api: CarouselApi) {
  api.on("select", () => {
    // Do something on select.
  })
}
</script>

<template>
  <Carousel :set-api="setApi">
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<script lang="ts">
  import { type CarouselApi } from "@/components/ui/carousel"

  function setApi(api: CarouselApi) {
    api.on("select", () => {
      // Do something on select.
    })
  }
</script>

<Carousel setApi={setApi}>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
import { CarouselApi } from "@/components/ui/carousel"

export function Example() {
  function setApi(api: CarouselApi) {
    api.on("select", () => {
      // Do something on select.
    })
  }

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
```

<!-- ::end:only -->

See the [Embla Carousel docs](https://www.embla-carousel.com/api/events/) for more information on using events.

## Plugins

You can use the `plugins` prop to add plugins to the carousel.

<!-- ::start:only react/base,react/aria -->

```ts
import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<script setup lang="ts">
import Autoplay from "embla-carousel-autoplay"

const plugin = Autoplay({ delay: 2000 })
</script>

<template>
  <Carousel :plugins="[plugin]">
    <!-- ... -->
  </Carousel>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<script lang="ts">
  import Autoplay from "embla-carousel-autoplay"

  const plugin = Autoplay({ delay: 2000 })
</script>

<Carousel plugins={[plugin]}>
  <!-- ... -->
</Carousel>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
import Autoplay from "embla-carousel-autoplay"

export function Example() {
  const plugin = Autoplay({ delay: 2000 })

  return <Carousel plugins={[plugin]} />
}
```

<!-- ::end:only -->

<!-- ::preview item="carousel-plugin" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="carousel-rtl" height="512" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" direction="rtl" -->

## API Reference

See the [Embla Carousel docs](https://www.embla-carousel.com/api/) for more information on props and plugins.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.

<!-- ::start:only angular/ng -->

Angular's is on Embla's core (`embla-carousel`), as React's is on its binding: `opts`, `plugins`, `orientation`, and `setApi`, which gives the Embla instance.

<!-- ::end:only -->
