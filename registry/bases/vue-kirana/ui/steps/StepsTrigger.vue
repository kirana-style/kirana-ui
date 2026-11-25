<script setup lang="ts">
import { Steps } from "@kirana-ui/vue/steps"
import { useSx } from "@kirana-style/core/vue"

import { steps } from "../../../../styles/steps.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Steps.Trigger
    data-slot="steps-trigger"
    v-bind="attrs"
    :sx="[steps.trigger, sx]"
  >
    <slot />
  </Steps.Trigger>
</template>
