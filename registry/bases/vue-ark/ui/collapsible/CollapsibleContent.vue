<script setup lang="ts">
import { CollapsibleContent } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <CollapsibleContent data-slot="collapsible-content" v-bind="attrs" :sx="sx">
    <slot />
  </CollapsibleContent>
</template>
