<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="avatar-group" v-bind="attrs" :sx="[avatar.group, sx]">
    <slot />
  </div>
</template>
