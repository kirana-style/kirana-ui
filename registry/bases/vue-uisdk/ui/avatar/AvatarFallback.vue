<script setup lang="ts">
import { AvatarFallback } from "@ui-sdk/vue/avatar"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="AvatarFallback"
    slot-name="avatar-fallback"
    tag="span"
    v-bind="attrs"
    :sx="[avatar.fallback, sx]"
  >
    <slot />
  </UisdkPart>
</template>
