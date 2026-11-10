<script setup lang="ts">
/**
 * cmdk's command menu on Reka UI's listbox: the items register from the markup, what is typed
 * filters them (by value and keywords, as cmdk's default filter does, without its fuzzy score),
 * groups with no match leave, the first match is highlighted (`data-selected`, as cmdk writes it),
 * and choosing an item calls its `select`; nothing stays selected.
 */
import { ListboxRoot } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed, nextTick, provide, ref, shallowRef, watch } from "vue"

import { command } from "../../../../styles/command.styles"
import { COMMAND } from "./context"
import type { CommandEntry } from "./context"

defineOptions({ inheritAttrs: false })

const { shouldFilter = true, dir } = defineProps<{
  shouldFilter?: boolean
  dir?: "ltr" | "rtl"
}>()
const { sx, attrs } = useSx()

const entries = shallowRef<CommandEntry[]>([])
const query = ref("")
const matches = (entry: CommandEntry) => {
  const q = query.value.trim().toLowerCase()
  if (!shouldFilter || !q) return true
  return [entry.value.value, ...entry.keywords].some((word) =>
    word.toLowerCase().includes(q)
  )
}
const shown = computed(() => entries.value.filter(matches))

// cmdk highlights the first match, again whenever what is typed changes; Reka's highlight is the
// one shown (`data-selected`), kept when the pointer leaves the list, as cmdk keeps its own.
const root = ref<{ highlightFirstItem?: () => void }>()
const highlighted = ref<string | null>(null)
watch(
  [query, () => entries.value.length],
  () => void nextTick(() => root.value?.highlightFirstItem?.()),
  { flush: "post" }
)

provide(COMMAND, {
  register(entry) {
    entries.value = [...entries.value, entry]
    return () =>
      (entries.value = entries.value.filter((e) => e.id !== entry.id))
  },
  visible: (value) => shown.value.some((entry) => entry.value.value === value),
  groupVisible: (group) => shown.value.some((entry) => entry.group === group),
  empty: computed(() => shown.value.length === 0),
  highlighted,
  query,
})
</script>

<template>
  <ListboxRoot
    ref="root"
    highlight-on-hover
    loop
    :dir="dir"
    as-child
    @highlight="
      (payload?: { value: unknown }) =>
        payload && (highlighted = String(payload.value))
    "
  >
    <div
      data-slot="command"
      cmdk-root
      tabindex="-1"
      :dir="dir"
      v-bind="attrs"
      :sx="[command.root, sx]"
    >
      <slot />
    </div>
  </ListboxRoot>
</template>
