<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span data-slot="avatar-badge" v-bind="attrs" :sx="[avatar.badge, sx]">
    <slot />
  </span>
</template>
