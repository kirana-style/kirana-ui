<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { carousel } from "../../../../styles/carousel.styles"
import { useCarousel } from "./context"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const { carouselRef, orientation } = useCarousel()
</script>

<template>
  <div
    :ref="(el) => (carouselRef = el as HTMLElement | undefined)"
    :sx="carousel.viewport"
    data-slot="carousel-content"
  >
    <div
      v-bind="attrs"
      :sx="[
        orientation === 'horizontal'
          ? carousel.content
          : carousel.contentVertical,
        sx,
      ]"
    >
      <slot />
    </div>
  </div>
</template>
