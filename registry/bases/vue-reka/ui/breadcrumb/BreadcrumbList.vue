<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { breadcrumb } from "../../../../styles/breadcrumb.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ol data-slot="breadcrumb-list" v-bind="attrs" :sx="[breadcrumb.list, sx]">
    <slot />
  </ol>
</template>
