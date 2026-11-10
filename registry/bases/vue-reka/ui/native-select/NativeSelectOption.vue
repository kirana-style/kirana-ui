<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { nativeSelect } from "../../../../styles/native-select.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <option
    data-slot="native-select-option"
    v-bind="attrs"
    :sx="[nativeSelect.option, sx]"
  >
    <slot />
  </option>
</template>
