/**
 * shadcn/ui's carousel on ui-sdk's own (LF-032: `embla-carousel-solid` does not run on Solid 2),
 * keeping the Embla-based API the other Solid bases take: `opts` (Embla's `align`, `loop`,
 * `direction`, `dragFree`, `skipSnaps`, `slidesToScroll`, `startIndex`, `watchDrag`, which ui-sdk
 * names `align`, `loop`, `dir`, `dragFree`, `skipSnaps`, `slidesPerPage`, `defaultPage` and `drag`),
 * `orientation`, `plugins` (Embla's Autoplay, as ui-sdk's rotation: its `delay` is the interval;
 * other plugins are not run) and `setApi`, handed a `CarouselApi` that answers the part of Embla's
 * API a page reads (`selectedScrollSnap`, `scrollSnapList`, `canScrollPrev` …, `on` and `off` for
 * `select`, `settle` and `reInit`).
 *
 * ui-sdk scrolls its viewport natively, where Embla translates the slides: the arrows' `disabled`
 * and the root's arrow keys are as shadcn/ui's, and the viewport takes focus for the arrow keys too.
 */
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  Carousel as UisdkCarousel,
  CarouselContent as UisdkCarouselContent,
  CarouselItem as UisdkCarouselItem,
  CarouselNext as UisdkCarouselNext,
  CarouselPrevious as UisdkCarouselPrevious,
  CarouselViewport,
  createCarouselController,
} from "@ui-sdk/solid/carousel"
import type { JSX } from "@solidjs/web"
import { createContext, merge, omit, onSettled, useContext } from "solid-js"

import type { button } from "../../../styles/button.styles"
import { carousel } from "../../../styles/carousel.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import { IconPlaceholder } from "./icon-placeholder"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/** Embla's options that ui-sdk's carousel has under its own names. */
export type CarouselOptions = {
  align?: "start" | "center" | "end"
  loop?: boolean
  direction?: "ltr" | "rtl"
  dragFree?: boolean
  skipSnaps?: boolean
  slidesToScroll?: number | "auto"
  startIndex?: number
  watchDrag?: boolean
}

/** An Embla plugin: Autoplay (`name: "autoplay"`) is read; the others are not run. */
export type CarouselPlugin = {
  readonly name: string
  readonly options?: unknown
}

type CarouselEvent = "select" | "settle" | "reInit"

/** The part of Embla's API a page reads, over ui-sdk's carousel controller. */
export type CarouselApi = {
  /** The current page, from 0, as Embla's snap. */
  selectedScrollSnap: () => number
  /** One entry a page, each how far along it lies, from 0 to 1, as Embla's snaps. */
  scrollSnapList: () => number[]
  canScrollPrev: () => boolean
  canScrollNext: () => boolean
  scrollPrev: () => void
  scrollNext: () => void
  /** Goes to a page, from 0. */
  scrollTo: (index: number) => void
  on: (
    event: CarouselEvent,
    callback: (api: CarouselApi) => void
  ) => CarouselApi
  off: (
    event: CarouselEvent,
    callback: (api: CarouselApi) => void
  ) => CarouselApi
}

/** What a Carousel hands its parts, as React's context does: getters, so they follow it. */
type CarouselContext = {
  readonly orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
}

const CarouselContext = createContext<CarouselContext | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)
  if (!context)
    throw new Error("useCarousel must be used within a <Carousel />")
  return context
}

/** An Autoplay plugin's rotation: whether it starts, and its delay. */
function autoplayOf(plugins: readonly CarouselPlugin[] | undefined) {
  const plugin = plugins?.find((p) => p.name === "autoplay")
  if (!plugin) return undefined
  const options = (plugin.options ?? {}) as {
    delay?: unknown
    playOnInit?: boolean
  }
  return {
    playing: options.playOnInit !== false,
    // Embla's default; a delay per snap (a function) has no ui-sdk equivalent.
    interval: typeof options.delay === "number" ? options.delay : 4000,
  }
}

function Carousel(props: {
  opts?: CarouselOptions
  plugins?: readonly CarouselPlugin[]
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = merge({ orientation: "horizontal" } as const, props)
  const rest = omit(
    local,
    "opts",
    "plugins",
    "orientation",
    "setApi",
    "class",
    "sx",
    "children"
  )
  const controller = createCarouselController()
  const autoplay = autoplayOf(local.plugins)

  // Embla's events, emitted from ui-sdk's: a page chosen, come to rest, or the pages re-measured.
  const listeners = new Map<CarouselEvent, Set<(api: CarouselApi) => void>>()
  const emit = (event: CarouselEvent) =>
    listeners.get(event)?.forEach((callback) => callback(api))
  const api: CarouselApi = {
    selectedScrollSnap: () => controller.getPage() - 1,
    scrollSnapList: () => {
      const count = controller.getPageCount() ?? 0
      return Array.from({ length: count }, (_, index) =>
        count > 1 ? index / (count - 1) : 0
      )
    },
    canScrollPrev: () => controller.canPrevious(),
    canScrollNext: () => controller.canNext(),
    scrollPrev: () => void controller.previous(),
    scrollNext: () => void controller.next(),
    scrollTo: (index) => void controller.setPage(index + 1),
    on(event, callback) {
      if (!listeners.has(event)) listeners.set(event, new Set())
      listeners.get(event)!.add(callback)
      return api
    },
    off(event, callback) {
      listeners.get(event)?.delete(callback)
      return api
    },
  }

  // The API goes to `setApi` once ui-sdk has measured the slides, as Embla's once it has
  // initialised; `reInit` follows a change in the number of pages.
  // LF-034: ui-sdk's carousel reports no measure or page-count change (its controller has no
  // `subscribe`, its events are page and playing changes), so the count is read each frame until
  // the slides are measured, then again on each resize.
  let root: HTMLElement | undefined
  onSettled(() => {
    let count: number | null = null
    let frame = 0
    const measure = () => {
      const next = controller.getPageCount()
      if (next === null) {
        frame = requestAnimationFrame(measure)
        return
      }
      if (count === null) local.setApi?.(api)
      else if (next !== count) emit("reInit")
      count = next
    }
    measure()
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    })
    if (root) observer.observe(root)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  })

  // shadcn/ui's arrow keys anywhere in the carousel; the viewport handles its own.
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) return
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      controller.previous()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      controller.next()
    }
  }
  return (
    <CarouselContext
      value={{
        get orientation() {
          return local.orientation
        },
        scrollPrev: () => void controller.previous(),
        scrollNext: () => void controller.next(),
      }}
    >
      <UisdkCarousel
        controller={controller}
        orientation={local.orientation}
        align={local.opts?.align ?? "center"}
        loop={local.opts?.loop}
        dragFree={local.opts?.dragFree}
        skipSnaps={local.opts?.skipSnaps}
        slidesPerPage={local.opts?.slidesToScroll}
        defaultPage={
          local.opts?.startIndex === undefined
            ? undefined
            : local.opts.startIndex + 1
        }
        drag={local.opts?.watchDrag}
        defaultPlaying={autoplay?.playing}
        interval={autoplay?.interval}
        dir={local.opts?.direction}
        onPageChange={() => queueMicrotask(() => emit("select"))}
        onPageChangeComplete={() => emit("settle")}
        ref={(el: HTMLElement) => (root = el)}
        role="region"
        aria-roledescription="carousel"
        {...rest}
        onKeyDown={onKeyDown}
        render={(given: Record<string, unknown>) => (
          <div
            {...given}
            data-slot="carousel"
            {...styleProps(
              given.class as string | undefined,
              local.class,
              carousel.root,
              local.sx
            )}
          />
        )}
      >
        {local.children}
      </UisdkCarousel>
    </CarouselContext>
  )
}

/**
 * The viewport ui-sdk scrolls (shadcn/ui's `carousel-content`) and the row of slides in it.
 * shadcn/ui's gutter is the row's negative start margin and each slide's padding, which Embla
 * measures from the row; ui-sdk measures each slide from the viewport, so a slide's page would be
 * the gutter short and show the slide's padding. The row's start margin becomes a translation
 * (which ui-sdk's measures leave out, as Embla's from the row do) and an end margin as wide (so the
 * row is as wide as under the margin): the slides stand where shadcn/ui's do, the viewport is
 * shadcn/ui's box, and each page brings its slide's padding to the viewport's edge, out of view.
 */
function CarouselContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  const context = useCarousel()
  let row: HTMLElement | undefined
  onSettled(() => {
    let frame = 0
    const place = () => {
      if (!row) return
      // Under a `<Loading>` boundary the row can settle before it is in the document (LF-035).
      if (!row.isConnected) {
        frame = requestAnimationFrame(place)
        return
      }
      const vertical = context.orientation === "vertical"
      for (const property of [
        "margin-top",
        "margin-right",
        "margin-left",
        "translate",
      ])
        row.style.removeProperty(property)
      const style = getComputedStyle(row)
      const rtl = style.direction === "rtl"
      const start = vertical
        ? "margin-top"
        : rtl
          ? "margin-right"
          : "margin-left"
      const gutter = parseFloat(style.getPropertyValue(start)) || 0
      if (!gutter) return
      row.style.setProperty(start, "0px")
      // A column's height is its own or its content's: only a row's width takes the margin back.
      if (!vertical) {
        const end = rtl ? "margin-left" : "margin-right"
        const own = parseFloat(style.getPropertyValue(end)) || 0
        row.style.setProperty(end, `${own + gutter}px`)
      }
      row.style.setProperty(
        "translate",
        vertical ? `0 ${gutter}px` : `${rtl ? -gutter : gutter}px 0`
      )
    }
    place()
    // A caller's gutter may change with the width.
    window.addEventListener("resize", place)
    // Solid 2 takes a settled callback's cleanup as its return.
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", place)
    }
  })
  // The row is made once, here, and handed to the viewport as its children: made in the viewport's
  // children, it would be made anew each time the viewport's render reads them again (as its
  // attributes change once ui-sdk has measured), dropping what was written on the old one.
  const content = (
    <UisdkCarouselContent
      ref={(el: HTMLElement) => (row = el)}
      {...rest}
      render={(given: Record<string, unknown>) => (
        <div
          {...given}
          data-slot={undefined}
          {...styleProps(
            given.class as string | undefined,
            props.class,
            context.orientation === "horizontal"
              ? carousel.content
              : carousel.contentVertical,
            props.sx
          )}
        />
      )}
    >
      {props.children}
    </UisdkCarouselContent>
  )
  return (
    <CarouselViewport
      render={(given: Record<string, unknown>) => (
        <div
          {...given}
          data-slot="carousel-content"
          {...styleProps(given.class as string | undefined, carousel.viewport)}
        />
      )}
    >
      {content}
    </CarouselViewport>
  )
}

function CarouselItem(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  const context = useCarousel()
  return (
    <UisdkCarouselItem
      role="group"
      aria-roledescription="slide"
      {...rest}
      render={(given: Record<string, unknown>) => (
        <div
          {...given}
          data-slot="carousel-item"
          {...styleProps(
            given.class as string | undefined,
            props.class,
            context.orientation === "horizontal"
              ? carousel.item
              : carousel.itemVertical,
            props.sx
          )}
        />
      )}
    >
      {props.children}
    </UisdkCarouselItem>
  )
}

/**
 * An arrow: ui-sdk's step, drawn as an outline Button, disabled at its end as shadcn/ui's (ui-sdk's
 * would stay focusable with `aria-disabled`).
 */
function CarouselStep(props: {
  part: typeof UisdkCarouselNext
  slot: string
  variant: ButtonVariants["variant"]
  size: ButtonVariants["size"]
  own: Sx
  class?: string
  sx?: Sx
  children: JSX.Element
  rest: Record<string, unknown>
}) {
  const Part = props.part
  return (
    <Part
      {...props.rest}
      render={(
        given: Record<string, unknown>,
        state: { disabled: boolean }
      ) => (
        <Button
          {...given}
          data-slot={props.slot}
          variant={props.variant}
          size={props.size}
          class={props.class}
          sx={[props.own, props.sx]}
          disabled={state.disabled}
        >
          {props.children}
        </Button>
      )}
    />
  )
}

function CarouselNext(props: {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const local = merge({ variant: "outline", size: "icon-sm" } as const, props)
  const rest = omit(local, "variant", "size", "class", "sx")
  const context = useCarousel()
  return (
    <CarouselStep
      part={UisdkCarouselNext}
      slot="carousel-next"
      variant={local.variant}
      size={local.size}
      own={
        context.orientation === "horizontal"
          ? carousel.next
          : carousel.nextVertical
      }
      class={local.class}
      sx={local.sx}
      rest={rest}
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
    </CarouselStep>
  )
}

function CarouselPrevious(props: {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const local = merge({ variant: "outline", size: "icon-sm" } as const, props)
  const rest = omit(local, "variant", "size", "class", "sx")
  const context = useCarousel()
  return (
    <CarouselStep
      part={UisdkCarouselPrevious}
      slot="carousel-previous"
      variant={local.variant}
      size={local.size}
      own={
        context.orientation === "horizontal"
          ? carousel.previous
          : carousel.previousVertical
      }
      class={local.class}
      sx={local.sx}
      rest={rest}
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
    </CarouselStep>
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
