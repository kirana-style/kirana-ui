<script setup lang="ts">
import { Combobox } from "@kirana-ui/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"
import { menuLabel } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Combobox.GroupLabel
    data-slot="combobox-label"
    v-bind="attrs"
    :sx="[menuLabel, combobox.label, sx]"
  >
    <slot />
  </Combobox.GroupLabel>
</template>
