<script setup lang="ts">
import { SelectTrigger } from "@ui-sdk/vue/select"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { size = "default" } = defineProps<{ size?: "sm" | "default" }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="SelectTrigger"
    slot-name="select-trigger"
    tag="button"
    :data-size="size"
    v-bind="attrs"
    :sx="[select.trigger, sx]"
  >
    <slot />
    <IconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconSelector"
      hugeicons="UnfoldMoreIcon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
      :sx="select.triggerIcon"
    />
  </UisdkPart>
</template>
