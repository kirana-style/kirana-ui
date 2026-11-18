<script setup lang="ts">
import { Avatar } from "@kirana-ui/vue/avatar"
import { useSx } from "@kirana-style/core/vue"

import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Avatar.Fallback
    data-slot="avatar-fallback"
    v-bind="attrs"
    :sx="[avatar.fallback, sx]"
  >
    <slot />
  </Avatar.Fallback>
</template>
