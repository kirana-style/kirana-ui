<script setup lang="ts">
import { MenuSeparator } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
import { menuSeparator } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => menuSeparator)
</script>

<template>
  <MenuSeparator data-slot="dropdown-menu-separator" v-bind="bound" />
</template>
