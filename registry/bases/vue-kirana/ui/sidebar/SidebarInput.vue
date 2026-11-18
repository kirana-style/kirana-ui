<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"
import { Input } from "../input"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Input
    data-slot="sidebar-input"
    data-sidebar="input"
    v-bind="attrs"
    :sx="[sidebar.input, sx]"
  />
</template>
