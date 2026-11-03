<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { useSlots } from "vue"

import { field } from "../../../../styles/field.styles"
import { Separator } from "../separator"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const slots = useSlots()
</script>

<template>
  <div
    data-slot="field-separator"
    :data-content="!!slots.default"
    v-bind="attrs"
    :sx="[field.separator, sx]"
  >
    <Separator :sx="field.separatorLine" />
    <span
      v-if="slots.default"
      data-slot="field-separator-content"
      :sx="field.separatorContent"
    >
      <slot />
    </span>
  </div>
</template>
