<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { message } from "../../../../styles/message.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="message-header" v-bind="attrs" :sx="[message.header, sx]">
    <slot />
  </div>
</template>
