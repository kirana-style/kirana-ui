---
title: Carousel
description: A carousel with motion and swipe built using Embla.
section: components
variants: [react/base, react/aria]
keywords: [carousel, slider, slides, embla, component, base, aria]
---

# Carousel

<!-- ::preview item="carousel-demo" height="360" combinations="react/base,react/aria" -->

## About

The carousel component is built using the [Embla Carousel](https://www.embla-carousel.com/) library.

## Installation

<!-- ::installation name="carousel" combinations="react/base,react/aria" -->

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

<!-- ::preview item="carousel-size" height="360" combinations="react/base,react/aria" -->

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

<!-- ::preview item="carousel-spacing" height="360" combinations="react/base,react/aria" -->

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

<!-- ::preview item="carousel-orientation" height="420" combinations="react/base,react/aria" -->

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

## API

Use a state and the `setApi` prop to get an instance of the carousel API.

<!-- ::preview item="carousel-api" height="400" combinations="react/base,react/aria" -->

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

## Events

You can listen to events using the api instance from `setApi`.

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

See the [Embla Carousel docs](https://www.embla-carousel.com/api/events/) for more information on using events.

## Plugins

You can use the `plugins` prop to add plugins to the carousel.

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

<!-- ::preview item="carousel-plugin" height="360" combinations="react/base,react/aria" -->

## API Reference

See the [Embla Carousel docs](https://www.embla-carousel.com/api/) for more information on props and plugins.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
