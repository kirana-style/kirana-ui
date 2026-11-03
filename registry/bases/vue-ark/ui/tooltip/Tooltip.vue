<script setup lang="ts">
import { TooltipRoot, useLocaleContext } from "@ark-ui/vue"
import type { TooltipRootProps } from "@ark-ui/vue"
import { computed, provide, ref } from "vue"

import { positioning as place } from "../../../../lib/placement"
import type { PlacementProps } from "../../../../lib/placement"
import { PLACEMENT } from "./placement"

// It renders no element: what a caller passes (`v-model:open` …) goes to Ark's root.
defineOptions({ inheritAttrs: false })

// Opens at once, as shadcn/ui's `TooltipProvider` (`delay = 0`) does.
const { openDelay = 0, positioning } = defineProps<{
  openDelay?: number
  /** Ark's own placement, over what the content asks for. */
  positioning?: TooltipRootProps["positioning"]
}>()

// The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
const placement = ref<PlacementProps>({})
provide(PLACEMENT, placement)
const locale = useLocaleContext()
const rtl = computed(() => locale?.value?.dir === "rtl")
const resolved = computed(() => ({
  ...place(placement.value, { arrow: 10, rtl: rtl.value }),
  ...positioning,
}))
</script>

<template>
  <!-- Closed, the popup leaves the page, as Base UI's does; Ark keeps it while its exit runs. -->
  <TooltipRoot
    lazy-mount
    unmount-on-exit
    :open-delay="openDelay"
    :positioning="resolved"
    v-bind="$attrs"
  >
    <slot />
  </TooltipRoot>
</template>
