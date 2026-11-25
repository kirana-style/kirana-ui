<script setup lang="ts">
import { Steps } from "@kirana-ui/vue/steps"
import { useSx } from "@kirana-style/core/vue"

import { steps } from "../../../../styles/steps.styles"
import StepsSeparator from "./StepsSeparator.vue"

defineOptions({ inheritAttrs: false })

/** A step: its trigger, then the line to the next step, which the last step hides. */
const { separator = true } = defineProps<{ separator?: boolean }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Steps.Item data-slot="steps-item" v-bind="attrs" :sx="[steps.item, sx]">
    <slot />
    <StepsSeparator v-if="separator" />
  </Steps.Item>
</template>
