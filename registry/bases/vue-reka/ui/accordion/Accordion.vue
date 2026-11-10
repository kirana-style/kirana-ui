<script setup lang="ts">
import { AccordionRoot } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed, provide, ref, watch } from "vue"

import { accordion } from "../../../../styles/accordion.styles"
import { ACCORDION_PANELS, useAccordionPanels } from "./panels"

defineOptions({ inheritAttrs: false })

// Base UI's props, as on Ark UI: `multiple`, and a value that is always a list. Reka's single
// accordion takes one value, so the list's first goes in. An open item closes again when pressed,
// as Base UI's does (Reka's `collapsible`). The value is kept here so a panel can enter the page a
// frame before Reka opens it (`panels.ts`).
const { multiple, defaultValue } = defineProps<{
  multiple?: boolean
  defaultValue?: string[]
}>()
const model = defineModel<string[] | undefined>({ default: undefined })
const own = ref(defaultValue ?? [])
const requested = computed(() => model.value ?? own.value)

const { pending, request, panels } = useAccordionPanels(requested.value)
watch(requested, (next) => request(next))
provide(ACCORDION_PANELS, panels)

/** What Reka is told: the values asked for whose panels are in the page. */
const told = computed(() => {
  const open = requested.value.filter((value) => !pending.value.has(value))
  return multiple ? open : (open[0] ?? "")
})
const choose = (value: string | string[] | undefined) => {
  const next = Array.isArray(value) ? value : value ? [value] : []
  own.value = next
  model.value = next
}

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A closed panel leaves the page, as Base UI's does (`panels.ts`). -->
  <AccordionRoot
    data-slot="accordion"
    :type="multiple ? 'multiple' : 'single'"
    collapsible
    :model-value="told"
    v-bind="attrs"
    :sx="[accordion.root, sx]"
    @update:model-value="choose"
  >
    <slot />
  </AccordionRoot>
</template>
