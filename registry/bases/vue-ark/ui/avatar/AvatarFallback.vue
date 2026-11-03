<script setup lang="ts">
import { AvatarContext, AvatarFallback } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { avatar } from "../../../../styles/avatar.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A span, as Base UI's fallback, and gone once the picture has loaded, as Base UI's is. -->
  <AvatarContext v-slot="state">
    <AvatarFallback v-if="!state.loaded" as-child>
      <span
        data-slot="avatar-fallback"
        v-bind="attrs"
        :sx="[avatar.fallback, sx]"
      >
        <slot />
      </span>
    </AvatarFallback>
  </AvatarContext>
</template>
