<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { trace } from "../../../../styles/trace.styles"
import { CollapsibleTrigger } from "../collapsible"
import TraceIcon from "./TraceIcon.vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <CollapsibleTrigger
    data-slot="trace-collapsible-trigger"
    v-bind="attrs"
    :sx="[trace.trigger, sx]"
  >
    <slot />
    <TraceIcon :sx="trace.chevron">
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
      />
    </TraceIcon>
  </CollapsibleTrigger>
</template>
