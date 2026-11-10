import { inject } from "vue"
import type { EmblaCarouselVueType } from "embla-carousel-vue"
import type { InjectionKey, Ref } from "vue"

export type CarouselApi = NonNullable<EmblaCarouselVueType[1]["value"]>

/** What a Carousel hands its parts, as React's context does. */
export type CarouselContext = {
  carouselRef: Ref<HTMLElement | undefined>
  api: Ref<CarouselApi | undefined>
  orientation: Ref<"horizontal" | "vertical">
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: Ref<boolean>
  canScrollNext: Ref<boolean>
}

export const CAROUSEL: InjectionKey<CarouselContext> = Symbol("carousel")

export function useCarousel() {
  const context = inject(CAROUSEL)
  if (!context)
    throw new Error("useCarousel must be used within a <Carousel />")
  return context
}
