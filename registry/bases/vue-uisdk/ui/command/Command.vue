<script setup lang="ts">
/**
 * cmdk's command menu on ui-sdk's command: the items register from the markup, what is typed filters
 * and ranks them (ui-sdk's fuzzy match, as cmdk's own), groups with no match leave, the first match
 * is highlighted (ui-sdk's `data-highlighted`, which the style module reads beside cmdk's
 * `data-selected`), and choosing an item calls its `select`. The Ark UI part's props: `shouldFilter`
 * and `dir`.
 */
import { Command } from "@ui-sdk/vue/command"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { command } from "../../../../styles/command.styles"

defineOptions({ inheritAttrs: false })

const { shouldFilter = true, dir } = defineProps<{
  shouldFilter?: boolean
  dir?: "ltr" | "rtl"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Command"
    slot-name="command"
    tag="div"
    cmdk-root
    tabindex="-1"
    :dir="dir"
    :filter="shouldFilter ? undefined : false"
    v-bind="attrs"
    :sx="[command.root, sx]"
  >
    <slot />
  </UisdkPart>
</template>
