<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { breadcrumb } from "../../../../styles/breadcrumb.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <li data-slot="breadcrumb-item" v-bind="attrs" :sx="[breadcrumb.item, sx]">
    <slot />
  </li>
</template>
