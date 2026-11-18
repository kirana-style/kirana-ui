<script setup lang="ts">
import { Avatar } from "@kirana-ui/vue/avatar"
import { useSx } from "@kirana-style/core/vue"

import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { src } = defineProps<{ src: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Avatar.Image
    data-slot="avatar-image"
    :src="src"
    v-bind="attrs"
    :sx="[avatar.image, sx]"
  />
</template>
