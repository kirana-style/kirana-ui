<script setup lang="ts">
import { Resizable } from "@kirana-ui/vue/resizable"
import { useSx } from "@kirana-style/core/vue"

import { resizable } from "../../../../styles/resizable.styles"

defineOptions({ inheritAttrs: false })

/** Vue's Ark UI handle names the panels it lies between (`id="a:b"`); Kirana UI's knows them. */
const { id, withHandle = false } = defineProps<{
  id?: string
  withHandle?: boolean
}>()
void id
const { sx, attrs } = useSx()
</script>

<template>
  <Resizable.Handle
    data-slot="resizable-handle"
    v-bind="attrs"
    :sx="[resizable.handle, resizable.handleKirana, sx]"
  >
    <div v-if="withHandle" :sx="resizable.grip" />
  </Resizable.Handle>
</template>
