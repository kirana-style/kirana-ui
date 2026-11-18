<script setup lang="ts">
import { Combobox } from "@kirana-ui/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import { menuSeparator } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Combobox.Separator
    data-slot="combobox-separator"
    v-bind="attrs"
    :sx="[menuSeparator, sx]"
  />
</template>
