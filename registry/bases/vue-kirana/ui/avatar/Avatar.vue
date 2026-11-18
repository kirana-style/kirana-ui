<script setup lang="ts">
import { Avatar } from "@kirana-ui/vue/avatar"
import { useSx } from "@kirana-style/core/vue"

import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { size = "default" } = defineProps<{ size?: "default" | "sm" | "lg" }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Avatar.Root
    data-slot="avatar"
    :data-size="size"
    v-bind="attrs"
    :sx="[avatar.root, sx]"
  >
    <slot />
  </Avatar.Root>
</template>
