<script setup lang="ts">
import { SelectItemGroup } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => select.group)
</script>

<template>
  <SelectItemGroup data-slot="select-group" v-bind="bound">
    <slot />
  </SelectItemGroup>
</template>
