<script setup lang="ts">
import { SelectGroup } from "@ui-sdk/vue/select"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="SelectGroup"
    name="select-group"
    tag="div"
    v-bind="attrs"
    :sx="[select.group, sx]"
  >
    <slot />
  </UisdkPart>
</template>
