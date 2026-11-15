<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { breadcrumb } from "../../../../styles/breadcrumb.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    v-bind="attrs"
    :sx="[breadcrumb.page, sx]"
  >
    <slot />
  </span>
</template>
