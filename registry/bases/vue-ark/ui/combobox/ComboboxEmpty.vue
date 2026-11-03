<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Base UI's empty part stays in the popup, shown by the content's `data-empty`; Ark's
       unmounts while there are items. -->
  <div data-slot="combobox-empty" v-bind="attrs" :sx="[combobox.empty, sx]">
    <slot />
  </div>
</template>
