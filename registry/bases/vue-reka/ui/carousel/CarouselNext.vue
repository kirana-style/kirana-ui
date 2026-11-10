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
const { orientation, scrollNext, canScrollNext } = useCarousel()
</script>

<template>
  <Button
    data-slot="carousel-next"
    :variant="variant"
    :size="size"
    :sx="[
      orientation === 'horizontal' ? carousel.next : carousel.nextVertical,
      sx,
    ]"
    :disabled="!canScrollNext"
    v-bind="attrs"
    @click="scrollNext"
  >
    <IconPlaceholder
      lucide="ChevronRightIcon"
      tabler="IconChevronRight"
      hugeicons="ArrowRight01Icon"
      phosphor="CaretRightIcon"
      remixicon="RiArrowRightSLine"
      :sx="carousel.flip"
    />
    <span :sx="visuallyHidden">Next slide</span>
  </Button>
</template>
