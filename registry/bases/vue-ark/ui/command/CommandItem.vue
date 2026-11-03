<script setup lang="ts">
import { ListboxItem } from "@ark-ui/vue"
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
const item = computed(() => ({ value: own.value, disabled }))
</script>

<template>
  <!-- Mounted while it does not match, so it stays registered; shown when it matches. -->
  <ListboxItem :item="item" :disabled="disabled" as-child>
    <div
      v-show="!own || visible(own)"
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
</template>
