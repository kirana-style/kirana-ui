<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import type { button } from "../../../../styles/button.styles"
import { carousel } from "../../../../styles/carousel.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"
import { useCarousel } from "./context"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

const { variant = "outline", size = "icon-sm" } = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>()
const { sx, attrs } = useSx()
const { orientation, scrollPrev, canScrollPrev } = useCarousel()
</script>

<template>
  <Button
    data-slot="carousel-previous"
    :variant="variant"
    :size="size"
    :sx="[
      orientation === 'horizontal'
        ? carousel.previous
        : carousel.previousVertical,
      sx,
    ]"
    :disabled="!canScrollPrev"
    v-bind="attrs"
    @click="scrollPrev"
  >
    <IconPlaceholder
      lucide="ChevronLeftIcon"
      tabler="IconChevronLeft"
      hugeicons="ArrowLeft01Icon"
      phosphor="CaretLeftIcon"
      remixicon="RiArrowLeftSLine"
      :sx="carousel.flip"
    />
    <span :sx="visuallyHidden">Previous slide</span>
  </Button>
</template>
