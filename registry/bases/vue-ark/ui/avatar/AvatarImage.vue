<script setup lang="ts">
import { AvatarImage } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="attrs"
    :sx="[avatar.image, sx]"
  />
</template>
