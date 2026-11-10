<script setup lang="ts">
import { ListboxContent } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { command } from "../../../../styles/command.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ListboxContent as-child>
    <div
      data-slot="command-list"
      cmdk-list
      aria-label="Suggestions"
      v-bind="attrs"
      :sx="[command.list, sx]"
    >
      <div cmdk-list-sizer><slot /></div>
    </div>
  </ListboxContent>
</template>
