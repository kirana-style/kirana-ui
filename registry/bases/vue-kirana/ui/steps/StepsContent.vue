<script setup lang="ts">
import { Steps } from "@kirana-ui/vue/steps"
import { useSx } from "@kirana-style/core/vue"

import { steps } from "../../../../styles/steps.styles"

defineOptions({ inheritAttrs: false })

const { index } = defineProps<{ index: number }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Steps.Content
    data-slot="steps-content"
    :index="index"
    v-bind="attrs"
    :sx="[steps.content, sx]"
  >
    <slot />
  </Steps.Content>
</template>
