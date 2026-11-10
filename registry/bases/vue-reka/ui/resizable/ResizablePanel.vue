<script setup lang="ts">
import { SplitterPanel } from "reka-ui"
import { computed, inject } from "vue"

import { PANELS } from "./context"

// One of the group's `panels`, by its id: its first size and its limits come from there.
const { id } = defineProps<{ id: string }>()
const group = inject(PANELS, undefined)
const index = computed(
  () => group?.panels().findIndex((panel) => panel.id === id) ?? -1
)
const entry = computed(() => group?.panels()[index.value])
</script>

<template>
  <SplitterPanel
    data-slot="resizable-panel"
    :id="id"
    :order="index"
    :default-size="group?.defaultSize()?.[index]"
    :min-size="entry?.minSize"
    :max-size="entry?.maxSize"
  >
    <slot />
  </SplitterPanel>
</template>
