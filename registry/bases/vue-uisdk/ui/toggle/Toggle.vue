<script setup lang="ts">
import { Toggle } from "@ui-sdk/vue/toggle"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { toggle, toggleScope } from "../../../../styles/toggle.styles"

defineOptions({ inheritAttrs: false })

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

const { variant = "default", size = "default" } = defineProps<{
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
}>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Toggle"
    slot-name="toggle"
    tag="button"
    v-bind="attrs"
    :sx="[toggleScope.anchor, toggle({ variant, size }), sx]"
  >
    <slot />
  </UisdkPart>
</template>
