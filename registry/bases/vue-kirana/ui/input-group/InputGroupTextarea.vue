<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { inputGroup } from "../../../../styles/input-group.styles"
import { Textarea } from "../textarea"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Textarea
    data-slot="input-group-control"
    v-bind="attrs"
    :sx="[inputGroup.textarea, sx]"
  />
</template>
