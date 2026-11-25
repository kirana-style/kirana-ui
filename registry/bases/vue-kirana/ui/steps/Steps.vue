<script setup lang="ts">
import { Steps } from "@kirana-ui/vue/steps"
import type { Orientation } from "@kirana-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { steps } from "../../../../styles/steps.styles"

defineOptions({ inheritAttrs: false })

/** Its other props are the primitive root's (`v-model:step`, `default-step`, `count`, `linear`). */
const { orientation = "horizontal" } = defineProps<{
  orientation?: Orientation
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Steps.Root
    data-slot="steps"
    :orientation="orientation"
    v-bind="attrs"
    :sx="[steps.root, sx]"
  >
    <slot />
  </Steps.Root>
</template>
