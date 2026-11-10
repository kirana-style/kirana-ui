<script setup lang="ts">
import { ListboxItem } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject, onMounted, onUnmounted, ref } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { command } from "../../../../styles/command.styles"
import { COMMAND_GROUP, useCommand } from "./context"

defineOptions({ inheritAttrs: false })

const {
  value,
  keywords = [],
  disabled = false,
} = defineProps<{
  /** What it is matched by and known as; its text, as cmdk's, when not given. */
  value?: string
  keywords?: string[]
  disabled?: boolean
}>()
const emit = defineEmits<{ select: [value: string] }>()
const { sx, attrs } = useSx()
const { register, visible, highlighted } = useCommand()
const group = inject(COMMAND_GROUP, undefined)

const el = ref<HTMLElement>()
const text = ref("")
const own = computed(() => value ?? text.value)
let unregister: (() => void) | undefined
onMounted(() => {
  text.value = el.value?.textContent?.trim() ?? ""
  unregister = register({
    id: Symbol("item"),
    value: own,
    keywords,
    group,
    disabled: computed(() => disabled),
    onSelect: () => emit("select", own.value),
  })
})
onUnmounted(() => unregister?.())

/** Chosen: its `select`, and nothing stays selected (the event's default is Reka's selection). */
function choose(event: Event) {
  event.preventDefault()
  emit("select", own.value)
}
const shown = computed(() => !own.value || visible(own.value))
</script>

<template>
  <!-- The part stays mounted while its row does not match, so it stays registered; the row is in
       the page, and in Reka's list, only while it matches. A disabled row is not Reka's item, so
       the arrow keys pass it, as cmdk's. -->
  <ListboxItem v-if="shown && !disabled" :value="own" as-child @select="choose">
    <div
      ref="el"
      data-slot="command-item"
      cmdk-item
      role="option"
      :aria-disabled="disabled"
      :aria-selected="highlighted === own"
      :data-disabled="String(disabled)"
      :data-selected="String(highlighted === own)"
      v-bind="attrs"
      :sx="[command.item, sx]"
    >
      <slot />
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
        :sx="command.itemIndicator"
      />
    </div>
  </ListboxItem>
  <div
    v-else-if="shown"
    ref="el"
    data-slot="command-item"
    cmdk-item
    role="option"
    aria-disabled="true"
    aria-selected="false"
    data-disabled="true"
    data-selected="false"
    v-bind="attrs"
    :sx="[command.item, sx]"
  >
    <slot />
    <IconPlaceholder
      lucide="CheckIcon"
      tabler="IconCheck"
      hugeicons="Tick02Icon"
      phosphor="CheckIcon"
      remixicon="RiCheckLine"
      :sx="command.itemIndicator"
    />
  </div>
</template>
