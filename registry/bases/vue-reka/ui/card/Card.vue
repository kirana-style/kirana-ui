<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { card } from "../../../../styles/card.styles"

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{ size?: "default" | "sm" }>(), { size: "default" })

const { sx, attrs } = useSx()
</script>

<template>
  <div v-bind="attrs" :sx="[card.root, sx]" data-slot="card" :data-size="size">
    <slot />
  </div>
</template>
