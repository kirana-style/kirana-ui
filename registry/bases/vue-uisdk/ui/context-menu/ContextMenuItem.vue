<script setup lang="ts">
import { MenuItem } from "@ui-sdk/vue/menu"
import { useSx } from "@kirana-style/core/vue"
import { useId } from "vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import {
  menuRowBase,
  menuRowDestructive,
  menuRowPadding,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const {
  value,
  inset,
  variant = "default",
} = defineProps<{
  value?: string
  inset?: boolean
  variant?: "default" | "destructive"
}>()
// Ark UI's item names itself when given no value; ui-sdk's needs one.
const id = useId()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="MenuItem"
    slot-name="context-menu-item"
    tag="div"
    :value="value ?? id"
    :data-inset="inset || undefined"
    :data-variant="variant"
    v-bind="attrs"
    :sx="[
      menuRowBase,
      menuRowPadding,
      variant === 'destructive' && menuRowDestructive,
      sx,
    ]"
  >
    <slot />
  </UisdkPart>
</template>
