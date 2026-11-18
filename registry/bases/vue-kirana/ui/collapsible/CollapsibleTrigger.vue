<script setup lang="ts">
import { Collapsible } from "@kirana-ui/vue/collapsible"
import { useSx } from "@kirana-style/core/vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Collapsible.Trigger data-slot="collapsible-trigger" v-bind="attrs" :sx="sx">
    <slot />
  </Collapsible.Trigger>
</template>
