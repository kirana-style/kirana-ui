<script setup lang="ts">
import { CommandSeparator } from "@ui-sdk/vue/command"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { command } from "../../../../styles/command.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Hidden while something is typed, as cmdk's: ui-sdk's composed separators hide while it filters. -->
  <UisdkPart
    :part="CommandSeparator"
    slot-name="command-separator"
    tag="div"
    cmdk-separator
    v-bind="attrs"
    :sx="[command.separator, sx]"
  ></UisdkPart>
</template>
