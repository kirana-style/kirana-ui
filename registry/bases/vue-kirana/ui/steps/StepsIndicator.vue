<script setup lang="ts">
import { Steps } from "@kirana-ui/vue/steps"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { steps } from "../../../../styles/steps.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- The step's mark: given no slot, its number, or a check once the step is done. -->
  <Steps.Indicator
    v-slot="{ state }"
    data-slot="steps-indicator"
    v-bind="attrs"
    :sx="[steps.indicator, sx]"
  >
    <slot>
      <IconPlaceholder
        v-if="state.complete"
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
    </slot>
  </Steps.Indicator>
</template>
