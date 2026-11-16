<script setup lang="ts">
import { CommandList } from "@ui-sdk/vue/command"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { command } from "../../../../styles/command.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="CommandList"
    slot-name="command-list"
    tag="div"
    cmdk-list
    aria-label="Suggestions"
    v-bind="attrs"
    :sx="[command.list, sx]"
  >
    <div cmdk-list-sizer><slot /></div>
  </UisdkPart>
</template>
