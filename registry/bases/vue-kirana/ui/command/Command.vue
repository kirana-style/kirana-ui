<script setup lang="ts">
/**
 * cmdk's command menu on Kirana UI's: the items come from the markup, what is typed filters them
 * by their text and keywords, groups with no match leave, and choosing an item calls its `select`.
 * The rows keep cmdk's attributes (`cmdk-item` …), which the command's styles read.
 */
import { Command } from "@kirana-ui/vue/command"
import { useSx } from "@kirana-style/core/vue"
import { provide } from "vue"

import { command } from "../../../../styles/command.styles"
import { COMMAND } from "./context"

defineOptions({ inheritAttrs: false })

const { shouldFilter = true, dir } = defineProps<{
  shouldFilter?: boolean
  dir?: "ltr" | "rtl"
}>()
const { sx, attrs } = useSx()
const selects = new Set<{ value: () => string; select: () => void }>()
provide(COMMAND, {
  register(value, select) {
    const entry = { value, select }
    selects.add(entry)
    return () => selects.delete(entry)
  },
})
const chosen = (value: string) => {
  for (const entry of selects) if (entry.value() === value) entry.select()
}
</script>

<template>
  <Command.Root
    data-slot="command"
    cmdk-root
    :dir="dir"
    :filter="shouldFilter ? undefined : null"
    v-bind="attrs"
    :sx="[command.root, sx]"
    @select="chosen"
  >
    <slot />
  </Command.Root>
</template>
