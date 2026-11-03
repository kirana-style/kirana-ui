<script setup lang="ts">
import { ToggleRoot } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

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
  <ToggleRoot
    data-slot="toggle"
    v-bind="attrs"
    :sx="[toggleScope.anchor, toggle({ variant, size }), sx]"
  >
    <slot />
  </ToggleRoot>
</template>
