<script setup lang="ts">
import { AvatarRoot } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { size = "default" } = defineProps<{ size?: "default" | "sm" | "lg" }>()
const { sx, attrs } = useSx()
</script>

<template>
  <!-- A span, as Base UI's avatar. -->
  <AvatarRoot as-child>
    <span
      data-slot="avatar"
      :data-size="size"
      v-bind="attrs"
      :sx="[avatar.root, sx]"
    >
      <slot />
    </span>
  </AvatarRoot>
</template>
