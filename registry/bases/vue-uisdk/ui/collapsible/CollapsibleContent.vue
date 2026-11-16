<script setup lang="ts">
import { CollapsiblePanel } from "@ui-sdk/vue/collapsible"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="CollapsiblePanel"
    slot-name="collapsible-content"
    tag="div"
    v-bind="attrs"
    :sx="sx"
  >
    <slot />
  </UisdkPart>
</template>
