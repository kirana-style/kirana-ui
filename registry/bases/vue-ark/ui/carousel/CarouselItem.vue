<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { carousel } from "../../../../styles/carousel.styles"
import { useCarousel } from "./context"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const { orientation } = useCarousel()
</script>

<template>
  <div
    role="group"
    aria-roledescription="slide"
    data-slot="carousel-item"
    v-bind="attrs"
    :sx="[
      orientation === 'horizontal' ? carousel.item : carousel.itemVertical,
      sx,
    ]"
  >
    <slot />
  </div>
</template>
