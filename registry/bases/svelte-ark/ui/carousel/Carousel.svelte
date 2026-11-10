<script lang="ts">
  import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel"
  import { onDestroy, setContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { carousel } from "../../../../styles/carousel.styles"
  import { CAROUSEL } from "./context"
  import type { CarouselApi, CarouselContext } from "./context"

  let {
    opts,
    plugins,
    orientation = "horizontal",
    setApi,
    class: className,
    children,
    ...rest
  }: {
    opts?: EmblaOptionsType
    plugins?: EmblaPluginType[]
    orientation?: "horizontal" | "vertical"
    setApi?: (api: CarouselApi) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Whether the arrows can move, read from Embla whenever it selects a slide or reinitialises.
  let api = $state<CarouselApi>()
  let canScrollPrev = $state(false)
  let canScrollNext = $state(false)
  function read(embla: CarouselApi) {
    canScrollPrev = embla.canScrollPrev()
    canScrollNext = embla.canScrollNext()
  }
  onDestroy(() => api?.off("reInit", read).off("select", read))

  setContext<CarouselContext>(CAROUSEL, {
    get orientation() {
      return orientation
    },
    get options() {
      return { ...opts, axis: (orientation === "horizontal" ? "x" : "y") as "x" | "y" }
    },
    get plugins() {
      return plugins ?? []
    },
    get canScrollPrev() {
      return canScrollPrev
    },
    get canScrollNext() {
      return canScrollNext
    },
    init(embla) {
      api = embla
      read(embla)
      embla.on("reInit", read).on("select", read)
      setApi?.(embla)
    },
    scrollPrev: () => api?.scrollPrev(),
    scrollNext: () => api?.scrollNext(),
  })

  function onkeydown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      api?.scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      api?.scrollNext()
    }
  }
</script>

<div
  role="region"
  aria-roledescription="carousel"
  data-slot="carousel"
  {...rest}
  class={className} sx={carousel.root}
  onkeydowncapture={onkeydown}
>
  {@render children?.()}
</div>
