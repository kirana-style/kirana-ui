<script setup lang="ts">
import { DrawerDescription } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { drawer } from "../../../../styles/drawer.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A paragraph, as Base UI's description. -->
  <DrawerDescription as-child>
    <p
      data-slot="drawer-description"
      v-bind="attrs"
      :sx="[drawer.description, sx]"
    >
      <slot />
    </p>
  </DrawerDescription>
</template>
