<script setup lang="ts">
import { CollapsibleTrigger } from "@ui-sdk/vue/collapsible"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="CollapsibleTrigger"
    slot-name="collapsible-trigger"
    tag="button"
    v-bind="attrs"
    :sx="sx"
  >
    <slot />
  </UisdkPart>
</template>
