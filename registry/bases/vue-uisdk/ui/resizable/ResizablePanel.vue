<script setup lang="ts">
import { ResizablePanel } from "@ui-sdk/vue/resizable"
import { computed, inject } from "vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { PANELS } from "./context"

/** A panel, its limits from its group's `panels` entry, as Ark UI's splitter reads them. */
const { id } = defineProps<{ id: string }>()
const panels = inject(PANELS, () => undefined)
const entry = computed(() => panels()?.find((panel) => panel.id === id))
</script>

<template>
  <UisdkPart
    :part="ResizablePanel"
    slot-name="resizable-panel"
    tag="div"
    :id="id"
    :min-size="entry?.minSize"
    :max-size="entry?.maxSize"
    :collapsible="entry?.collapsible"
    :collapsed-size="entry?.collapsedSize"
  >
    <slot />
  </UisdkPart>
</template>
