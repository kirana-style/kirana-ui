<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { message } from "../../../../styles/message.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="message-content" v-bind="attrs" :sx="[message.content, sx]">
    <slot />
  </div>
</template>
