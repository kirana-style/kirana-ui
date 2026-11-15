<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { input } from "../../../../styles/input.styles"

defineOptions({ inheritAttrs: false })

// `v-model`, as on a native one; the value is bound only when the caller keeps one.
const model = defineModel<string>()
const { sx, attrs } = useSx()
</script>

<template>
  <input
    data-slot="input"
    v-bind="model === undefined ? attrs : { ...attrs, value: model }"
    @input="model = ($event.target as HTMLInputElement).value"
    :sx="[input, sx]"
  />
</template>
