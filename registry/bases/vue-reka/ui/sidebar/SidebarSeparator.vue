<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"
import { Separator } from "../separator"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Separator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    v-bind="attrs"
    :sx="[sidebar.separator, sx]"
  />
</template>
