<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { textarea } from "../../../../styles/textarea.styles"

defineOptions({ inheritAttrs: false })

// `v-model`, as on a native one; the value is bound only when the caller keeps one.
const model = defineModel<string>()
const { sx, attrs } = useSx()
</script>

<template>
  <textarea
    data-slot="textarea"
    v-bind="model === undefined ? attrs : { ...attrs, value: model }"
    @input="model = ($event.target as HTMLTextAreaElement).value"
    :sx="[textarea, sx]"
  />
</template>
