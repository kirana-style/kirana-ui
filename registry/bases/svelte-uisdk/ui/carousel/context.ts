/** What a Carousel hands its parts, as React's context does: getters, so they follow it. */
import { getContext } from "svelte"
import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from "embla-carousel"

export type CarouselApi = EmblaCarouselType

export type CarouselContext = {
  readonly orientation: "horizontal" | "vertical"
  /** Embla's options and plugins, which `CarouselContent` hands its action. */
  readonly options: EmblaOptionsType
  readonly plugins: EmblaPluginType[]
  readonly canScrollPrev: boolean
  readonly canScrollNext: boolean
  /** Embla's API, once `CarouselContent` has created it. */
  init: (api: CarouselApi) => void
  scrollPrev: () => void
  scrollNext: () => void
}

export const CAROUSEL = Symbol("carousel")

export function useCarousel() {
  const context = getContext<CarouselContext | undefined>(CAROUSEL)
  if (!context)
    throw new Error("useCarousel must be used within a <Carousel />")
  return context
}
