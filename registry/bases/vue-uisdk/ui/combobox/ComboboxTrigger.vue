<script setup lang="ts">
import { ComboboxTrigger } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { combobox } from "../../../../styles/combobox.styles"
import { ANCHORS } from "./context"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{ asChild?: boolean }>()
const { sx, attrs } = useSx()

// Without an input outside the popup, the trigger places it.
const anchors = inject(ANCHORS, undefined)
const anchor = (el: Element | null) => {
  if (anchors) anchors.trigger = el
}
</script>

<template>
  <!-- As Base UI's `render`, a child given takes the trigger's chevron inside it, after its own
       children (`after`), rather than beside it. -->
  <UisdkPart
    :part="ComboboxTrigger"
    slot-name="combobox-trigger"
    tag="button"
    :as-child="asChild"
    :element="anchor"
    v-bind="attrs"
    :sx="[combobox.triggerOwn, sx]"
  >
    <slot />
    <template v-if="!asChild">
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        :sx="combobox.triggerIcon"
      />
    </template>
    <template v-if="asChild" #after>
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        :sx="combobox.triggerIcon"
      />
    </template>
  </UisdkPart>
</template>
