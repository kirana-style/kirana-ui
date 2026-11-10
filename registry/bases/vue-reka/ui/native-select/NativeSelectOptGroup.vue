<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { nativeSelect } from "../../../../styles/native-select.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <optgroup
    data-slot="native-select-optgroup"
    v-bind="attrs"
    :sx="[nativeSelect.option, sx]"
  >
    <slot />
  </optgroup>
</template>
