<script setup lang="ts">
import { CommandItem } from "@ui-sdk/vue/command"
import { useSx } from "@kirana-style/core/vue"
import { computed, ref } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { command } from "../../../../styles/command.styles"

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

// cmdk matches an item by its text when it has no value; ui-sdk matches its `label`.
const text = ref("")
const own = computed(() => value ?? text.value)
const read = (el: Element | null) => {
  if (el) text.value = el.textContent?.trim() ?? ""
}
</script>

<template>
  <UisdkPart
    :part="CommandItem"
    slot-name="command-item"
    tag="div"
    cmdk-item
    :value="value"
    :label="own || undefined"
    :keywords="keywords"
    :disabled="disabled"
    :on-select="() => emit('select', own)"
    :element="read"
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
  </UisdkPart>
</template>
