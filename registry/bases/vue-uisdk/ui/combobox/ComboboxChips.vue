<script setup lang="ts">
import { ComboboxChips } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"
import { inject, onUnmounted } from "vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { combobox } from "../../../../styles/combobox.styles"
import { ANCHORS } from "./context"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()

// The chips place the popup (Base UI's `anchor`, which its examples give them).
const anchors = inject(ANCHORS, undefined)
const anchor = (el: Element | null) => {
  if (anchors) anchors.chips = el
}
onUnmounted(() => anchor(null))
</script>

<template>
  <UisdkPart
    :part="ComboboxChips"
    slot-name="combobox-chips"
    tag="div"
    :element="anchor"
    v-bind="attrs"
    :sx="[combobox.chips, sx]"
  >
    <slot />
  </UisdkPart>
</template>
