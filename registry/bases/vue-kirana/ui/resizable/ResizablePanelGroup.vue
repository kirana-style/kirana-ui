<script setup lang="ts">
import { Resizable } from "@kirana-ui/vue/resizable"
import { useSx } from "@kirana-style/core/vue"
import { inject, provide } from "vue"

import { resizable } from "../../../../styles/resizable.styles"
import { RESIZABLE } from "./context"

defineOptions({ inheritAttrs: false })

/**
 * Kirana UI's resizable group, with Vue's Ark UI parts' props: the panels by id (`panels`, each
 * with its limits) and their shares in order (`default-size`), which each panel takes as its own.
 */
const {
  panels,
  defaultSize,
  orientation = "horizontal",
} = defineProps<{
  panels: readonly { id: string; minSize?: number; maxSize?: number }[]
  defaultSize?: readonly number[]
  orientation?: "horizontal" | "vertical"
}>()
const { sx, attrs } = useSx()
// Inside another group's panel: the outer group's sizes are there to find.
const nested = inject(RESIZABLE, undefined) !== undefined
provide(RESIZABLE, (id) => {
  const index = panels.findIndex((panel) => panel.id === id)
  const panel = panels[index]
  return {
    defaultSize: index === -1 ? undefined : defaultSize?.[index],
    minSize: panel?.minSize,
    maxSize: panel?.maxSize,
  }
})
</script>

<template>
  <Resizable.Group
    data-slot="resizable-panel-group"
    :orientation="orientation"
    v-bind="attrs"
    :sx="[
      resizable.group,
      resizable.groupKirana,
      nested && resizable.groupNestedKirana,
      sx,
    ]"
  >
    <slot />
  </Resizable.Group>
</template>
