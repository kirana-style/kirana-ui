<script setup lang="ts">
import { SelectIndicator, SelectTrigger } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject, watchEffect } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { select } from "../../../../styles/select.styles"
import { TRIGGER_ID } from "./placement"

defineOptions({ inheritAttrs: false })

const { size = "default" } = defineProps<{ size?: "sm" | "default" }>()
const { sx, attrs } = useSx()
// A caller's id goes to the root, which writes it on this element as Zag's own.
const triggerId = inject(TRIGGER_ID, undefined)
watchEffect(
  () => triggerId && (triggerId.value = attrs.value.id as string | undefined)
)
const rest = computed(() => {
  const { id: _id, ...others } = attrs.value
  return others
})
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="rest"
    :sx="[select.trigger, select.triggerArk, sx]"
  >
    <slot />
    <SelectIndicator as-child>
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconSelector"
        hugeicons="UnfoldMoreIcon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        :sx="select.triggerIcon"
      />
    </SelectIndicator>
  </SelectTrigger>
</template>
