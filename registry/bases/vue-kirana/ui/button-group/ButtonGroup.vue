<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { buttonGroup } from "../../../../styles/button-group.styles"

defineOptions({ inheritAttrs: false })

type ButtonGroupVariants = NonNullable<Parameters<typeof buttonGroup.root>[0]>

const { orientation } = defineProps<{
  orientation?: ButtonGroupVariants["orientation"]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="button-group"
    role="group"
    :data-orientation="orientation"
    v-bind="attrs"
    :sx="[buttonGroup.root({ orientation }), buttonGroup.width, sx]"
  >
    <slot />
  </div>
</template>
