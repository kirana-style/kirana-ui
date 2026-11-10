<script setup lang="ts">
import { RadioGroupRoot } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { radioGroup } from "../../../../styles/radio-group.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <RadioGroupRoot
    data-slot="radio-group"
    v-bind="attrs"
    :sx="[radioGroup.root, sx]"
  >
    <slot />
  </RadioGroupRoot>
</template>
