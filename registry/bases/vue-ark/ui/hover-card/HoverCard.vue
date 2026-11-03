<script setup lang="ts">
import { HoverCardRoot, useLocaleContext } from "@ark-ui/vue"
import type { HoverCardRootProps } from "@ark-ui/vue"
import { computed, provide, ref } from "vue"

import { positioning as place } from "../../../../lib/placement"
import type { PlacementProps } from "../../../../lib/placement"
import { PLACEMENT } from "./placement"

// It renders no element: what a caller passes (`v-model:open` …) goes to Ark's root.
defineOptions({ inheritAttrs: false })

const { positioning } = defineProps<{
  /** Ark's own placement, over what the content asks for. */
  positioning?: HoverCardRootProps["positioning"]
}>()

// The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
const placement = ref<PlacementProps>({})
provide(PLACEMENT, placement)
const locale = useLocaleContext()
const rtl = computed(() => locale?.value?.dir === "rtl")
const resolved = computed(() => ({
  ...place(placement.value, { rtl: rtl.value }),
  ...positioning,
}))
</script>

<template>
  <!-- Closed, the popup leaves the page, as Base UI's does; Ark keeps it while its exit runs. -->
  <HoverCardRoot
    lazy-mount
    unmount-on-exit
    :positioning="resolved"
    v-bind="$attrs"
  >
    <slot />
  </HoverCardRoot>
</template>
