<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { textarea } from "../../../../styles/textarea.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <textarea data-slot="textarea" v-bind="attrs" :sx="[textarea, sx]" />
</template>
