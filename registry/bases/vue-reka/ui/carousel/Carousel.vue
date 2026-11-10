<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import emblaCarouselVue from "embla-carousel-vue"
import { computed, onUnmounted, provide, ref, watch } from "vue"

import { carousel } from "../../../../styles/carousel.styles"
import { CAROUSEL } from "./context"
import type { CarouselApi } from "./context"

type CarouselParameters = Parameters<typeof emblaCarouselVue>
type CarouselOptions =
  NonNullable<CarouselParameters[0]> extends infer O
    ? O extends { value: infer V }
      ? V
      : O
    : never
type CarouselPlugin = CarouselApi["plugins"] extends () => infer P
  ? P[keyof P]
  : never

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    opts?: CarouselOptions
    plugins?: CarouselPlugin[]
    orientation?: "horizontal" | "vertical"
    setApi?: (api: CarouselApi) => void
  }>(),
  { orientation: "horizontal" }
)
const { sx, attrs } = useSx()

const [carouselRef, api] = emblaCarouselVue(
  computed(() => ({
    ...props.opts,
    axis: props.orientation === "horizontal" ? "x" : "y",
  })),
  computed(() => props.plugins ?? [])
)

// Whether the arrows can move, read from Embla whenever it selects a slide or reinitialises.
const canScrollPrev = ref(false)
const canScrollNext = ref(false)
function read(embla: CarouselApi) {
  canScrollPrev.value = embla.canScrollPrev()
  canScrollNext.value = embla.canScrollNext()
}
watch(api, (embla, _, onCleanup) => {
  if (!embla) return
  read(embla)
  embla.on("reInit", read).on("select", read)
  props.setApi?.(embla)
  onCleanup(() => embla.off("reInit", read).off("select", read))
})
onUnmounted(() => api.value?.off("reInit", read).off("select", read))

const scrollPrev = () => api.value?.scrollPrev()
const scrollNext = () => api.value?.scrollNext()

function onKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowLeft") {
    event.preventDefault()
    scrollPrev()
  } else if (event.key === "ArrowRight") {
    event.preventDefault()
    scrollNext()
  }
}

provide(CAROUSEL, {
  carouselRef,
  api,
  orientation: computed(
    () =>
      props.orientation ||
      (props.opts?.axis === "y" ? "vertical" : "horizontal")
  ),
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
})
</script>

<template>
  <div
    role="region"
    aria-roledescription="carousel"
    data-slot="carousel"
    v-bind="attrs"
    :sx="[carousel.root, sx]"
    @keydown.capture="onKeydown"
  >
    <slot />
  </div>
</template>
