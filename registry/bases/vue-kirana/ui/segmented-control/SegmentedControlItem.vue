<script setup lang="ts">
import { Toggle } from "@kirana-ui/vue/toggle"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import { segmentedControl } from "../../../../styles/segmented-control.styles"
import { tabs } from "../../../../styles/tabs.styles"
import { SEGMENTED_CONTROL } from "./context"

defineOptions({ inheritAttrs: false })

/** One choice: Kirana UI's toggle with a `value`, which the control holds while it is chosen. */
const { value } = defineProps<{ value: string }>()
const { sx, attrs } = useSx()
const size = inject(SEGMENTED_CONTROL, undefined)
</script>

<template>
  <Toggle
    data-slot="segmented-control-item"
    :data-size="size ?? 'default'"
    :value="value"
    v-bind="attrs"
    :sx="[tabs.trigger, segmentedControl.item, sx]"
  >
    <slot />
  </Toggle>
</template>
