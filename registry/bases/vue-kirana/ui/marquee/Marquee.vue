<script setup lang="ts">
import { css } from "@kirana-style/core"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { marqueeCtx } from "../../../../core/context"
import { marquee } from "../../../../styles/marquee.styles"
import MarqueeContent from "./MarqueeContent.vue"

defineOptions({ inheritAttrs: false })

/**
 * Its slot scrolling in a loop toward `direction`, one loop every `speed` (a CSS time), drawn twice
 * so the loop has no gap: the second copy is hidden from a screen reader and the keyboard.
 */
const {
  direction = "left",
  speed = "40s",
  gap,
  pauseOnHover = false,
  reverse = false,
  fade = false,
} = defineProps<{
  direction?: "left" | "right" | "up" | "down"
  /** One loop, as a CSS time. */
  speed?: string
  /** The space between items, as a CSS length. */
  gap?: string
  pauseOnHover?: boolean
  reverse?: boolean
  fade?: boolean
}>()
const { sx, attrs } = useSx()

const vertical = computed(() => direction === "up" || direction === "down")
const reversed = computed(
  () => (direction === "right" || direction === "down") !== reverse
)
const run = computed(() => [
  vertical.value && marquee.contentVertical,
  reversed.value && marquee.reverse,
  pauseOnHover && marquee.pause,
])
// The knobs, set on the root and read by both copies.
const knobs = computed(() =>
  css({ [marqueeCtx.duration]: speed, [marqueeCtx.gap]: gap })
)
</script>

<template>
  <div
    data-slot="marquee"
    :data-orientation="vertical ? 'vertical' : 'horizontal'"
    :data-direction="direction"
    v-bind="attrs"
    :sx="[
      marquee.root,
      vertical && marquee.vertical,
      fade && (vertical ? marquee.fadeY : marquee.fadeX),
      knobs,
      sx,
    ]"
  >
    <MarqueeContent :sx="run">
      <slot />
    </MarqueeContent>
    <MarqueeContent aria-hidden="true" inert :sx="[run, marquee.duplicate]">
      <slot />
    </MarqueeContent>
  </div>
</template>
