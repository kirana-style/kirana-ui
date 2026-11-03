<script setup lang="ts">
/**
 * cmdk's command menu on Ark UI's listbox: the items register from the markup, what is typed
 * filters them (by value and keywords, as cmdk's default filter does, without its fuzzy score),
 * groups with no match leave, the first match is highlighted (`data-selected`, as cmdk writes it),
 * and choosing an item calls its `select`; nothing stays selected.
 */
import { ListboxRoot, createListCollection } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { computed, provide, ref, shallowRef, watch } from "vue"

import { command } from "../../../../styles/command.styles"
import { COMMAND } from "./context"
import type { CommandEntry } from "./context"

defineOptions({ inheritAttrs: false })

// Ark's listbox takes its direction from the locale provider alone (a `dir` prop is ignored), so a
// right-to-left command sits in a `DirectionProvider`, as its demo does.
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
// Ark's collection holds plain items, the same shape each `CommandItem` hands its `ListboxItem`.
const collection = computed(() =>
  createListCollection({
    items: shown.value.map((entry) => ({
      value: entry.value.value,
      disabled: entry.disabled.value,
    })),
    itemToValue: (item) => item.value,
    itemToString: (item) => item.value,
    isItemDisabled: (item) => !!item.disabled,
  })
)

// cmdk highlights the first match, again whenever what is typed changes.
const highlighted = ref<string | null>(null)
const first = () =>
  shown.value.find((entry) => !entry.disabled.value)?.value.value ?? null
watch(
  [query, () => entries.value.length],
  () => (highlighted.value = first()),
  {
    flush: "post",
  }
)

function select(value: string) {
  entries.value.find((entry) => entry.value.value === value)?.onSelect()
}

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
    :collection="collection"
    :model-value="[]"
    :highlighted-value="highlighted ?? undefined"
    loop-focus
    as-child
    @highlight-change="
      (d: { highlightedValue: string | null }) =>
        (highlighted = d.highlightedValue)
    "
    @select="(d: { value: string }) => select(d.value)"
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
