<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { empty } from "../../../../styles/empty.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="empty-title" v-bind="attrs" :sx="[empty.title, sx]">
    <slot />
  </div>
</template>
