<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { inputGroup } from "../../../../styles/input-group.styles"
import { Input } from "../input"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Input
    data-slot="input-group-control"
    v-bind="attrs"
    :sx="[inputGroup.input, sx]"
  />
</template>
