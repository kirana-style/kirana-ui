<script setup lang="ts">
import { AvatarImage } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

// Reka's required `src` is declared here and passed on, so a project's type checker sees it.
const { src } = defineProps<{ src: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    :src="src"
    v-bind="attrs"
    :sx="[avatar.image, sx]"
  />
</template>
