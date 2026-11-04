import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from "embla-carousel"
import createEmblaCarousel from "embla-carousel-solid"
import {
  createContext,
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
  splitProps,
  useContext,
} from "solid-js"
import type { JSX } from "solid-js"

import type { button } from "../../../styles/button.styles"
import { carousel } from "../../../styles/carousel.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import { IconPlaceholder } from "./icon-placeholder"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

export type CarouselApi = EmblaCarouselType

/** What a Carousel hands its parts, as React's context does: getters, so they follow it. */
type CarouselContext = {
  readonly orientation: "horizontal" | "vertical"
  readonly canScrollPrev: boolean
  readonly canScrollNext: boolean
  /** The viewport Embla moves, which `CarouselContent` gives it. */
  carouselRef: (element: HTMLElement) => void
  scrollPrev: () => void
  scrollNext: () => void
}

const CarouselContext = createContext<CarouselContext>()

function useCarousel() {
  const context = useContext(CarouselContext)
  if (!context)
    throw new Error("useCarousel must be used within a <Carousel />")
  return context
}

function Carousel(props: {
  opts?: EmblaOptionsType
  plugins?: EmblaPluginType[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ orientation: "horizontal" } as const, props),
    ["opts", "plugins", "orientation", "setApi", "class", "sx", "children"]
  )
  const [carouselRef, api] = createEmblaCarousel(
    () => ({
      ...local.opts,
      axis: local.orientation === "horizontal" ? "x" : "y",
    }),
    () => local.plugins ?? []
  )
  // Whether the arrows can move, read from Embla whenever it selects a slide or reinitialises.
  const [canScrollPrev, setCanScrollPrev] = createSignal(false)
  const [canScrollNext, setCanScrollNext] = createSignal(false)
  const read = (embla: CarouselApi) => {
    setCanScrollPrev(embla.canScrollPrev())
    setCanScrollNext(embla.canScrollNext())
  }
  createEffect(() => {
    const embla = api()
    if (!embla) return
    read(embla)
    embla.on("reInit", read).on("select", read)
    local.setApi?.(embla)
    onCleanup(() => embla.off("reInit", read).off("select", read))
  })
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      api()?.scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      api()?.scrollNext()
    }
  }
  return (
    <CarouselContext.Provider
      value={{
        get orientation() {
          return local.orientation
        },
        get canScrollPrev() {
          return canScrollPrev()
        },
        get canScrollNext() {
          return canScrollNext()
        },
        carouselRef,
        scrollPrev: () => api()?.scrollPrev(),
        scrollNext: () => api()?.scrollNext(),
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...rest}
        {...styleProps(local.class, carousel.root, local.sx)}
        onKeyDown={onKeyDown}
      >
        {local.children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  const context = useCarousel()
  return (
    <div
      ref={context.carouselRef}
      sx={carousel.viewport}
      data-slot="carousel-content"
    >
      <div
        {...rest}
        {...styleProps(
          local.class,
          context.orientation === "horizontal"
            ? carousel.content
            : carousel.contentVertical,
          local.sx
        )}
      >
        {local.children}
      </div>
    </div>
  )
}

function CarouselItem(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  const context = useCarousel()
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      {...rest}
      {...styleProps(
        local.class,
        context.orientation === "horizontal"
          ? carousel.item
          : carousel.itemVertical,
        local.sx
      )}
    >
      {local.children}
    </div>
  )
}

function CarouselNext(props: {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "outline", size: "icon-sm" } as const, props),
    ["variant", "size", "class", "sx"]
  )
  const context = useCarousel()
  return (
    <Button
      data-slot="carousel-next"
      variant={local.variant}
      size={local.size}
      class={local.class}
      sx={[
        context.orientation === "horizontal"
          ? carousel.next
          : carousel.nextVertical,
        local.sx,
      ]}
      disabled={!context.canScrollNext}
      {...rest}
      onClick={context.scrollNext}
    >
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
        {...styleProps(carousel.flip)}
      />
      <span sx={visuallyHidden}>Next slide</span>
    </Button>
  )
}

function CarouselPrevious(props: {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "outline", size: "icon-sm" } as const, props),
    ["variant", "size", "class", "sx"]
  )
  const context = useCarousel()
  return (
    <Button
      data-slot="carousel-previous"
      variant={local.variant}
      size={local.size}
      class={local.class}
      sx={[
        context.orientation === "horizontal"
          ? carousel.previous
          : carousel.previousVertical,
        local.sx,
      ]}
      disabled={!context.canScrollPrev}
      {...rest}
      onClick={context.scrollPrev}
    >
      <IconPlaceholder
        lucide="ChevronLeftIcon"
        tabler="IconChevronLeft"
        hugeicons="ArrowLeft01Icon"
        phosphor="CaretLeftIcon"
        remixicon="RiArrowLeftSLine"
        {...styleProps(carousel.flip)}
      />
      <span sx={visuallyHidden}>Previous slide</span>
    </Button>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
}
