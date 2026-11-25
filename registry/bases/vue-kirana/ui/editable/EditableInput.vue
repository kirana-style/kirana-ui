<script setup lang="ts">
import { Editable } from "@kirana-ui/vue/editable"
import { useSx } from "@kirana-style/core/vue"

import { editable } from "../../../../styles/editable.styles"
import { input } from "../../../../styles/input.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Editable.Input
    data-slot="editable-input"
    v-bind="attrs"
    :sx="[input, editable.input, sx]"
  />
</template>
