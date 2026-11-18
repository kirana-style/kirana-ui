<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { inputGroup } from "../../../../styles/input-group.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="input-group"
    role="group"
    v-bind="attrs"
    :sx="[inputGroup.root, sx]"
  >
    <slot />
  </div>
</template>
