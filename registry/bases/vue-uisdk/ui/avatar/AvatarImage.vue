<script setup lang="ts">
import { AvatarImage } from "@ui-sdk/vue/avatar"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="AvatarImage"
    slot-name="avatar-image"
    tag="img"
    v-bind="attrs"
    :sx="[avatar.image, sx]"
  />
</template>
