<script setup lang="ts">
import { AvatarFallback } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A span, as Base UI's fallback, and gone once the picture has loaded, as Reka's is. -->
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="attrs"
    :sx="[avatar.fallback, sx]"
  >
    <slot />
  </AvatarFallback>
</template>
