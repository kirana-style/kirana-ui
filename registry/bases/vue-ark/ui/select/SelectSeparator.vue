<script setup lang="ts">
// Ark's select has no separator part: a rule between groups, as the others draw it.
import { useStyleAttrs } from "../../../../lib/vue"
import { menuSeparator } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => menuSeparator)
</script>

<template>
  <div role="separator" data-slot="select-separator" v-bind="bound" />
</template>
