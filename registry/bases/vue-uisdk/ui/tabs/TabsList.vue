<script setup lang="ts">
import { TabsList } from "@ui-sdk/vue/tabs"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

const { variant = "default" } = defineProps<{ variant?: "default" | "line" }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="TabsList"
    name="tabs-list"
    tag="div"
    :data-variant="variant"
    v-bind="attrs"
    :sx="[tabs.list, variant === 'line' ? tabs.listLine : tabs.listDefault, sx]"
  >
    <slot />
  </UisdkPart>
</template>
