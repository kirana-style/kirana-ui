<script setup lang="ts">
import { CollapsibleTrigger } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <CollapsibleTrigger data-slot="collapsible-trigger" v-bind="attrs" :sx="sx">
    <slot />
  </CollapsibleTrigger>
</template>
