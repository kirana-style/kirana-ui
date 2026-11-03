<script setup lang="ts">
// Unstyled, as upstream's: a caller's `sx` is all it draws.
import { CollapsibleRoot } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A closed panel leaves the page, as Base UI's does. -->
  <CollapsibleRoot
    data-slot="collapsible"
    lazy-mount
    unmount-on-exit
    v-bind="attrs"
    :sx="sx"
  >
    <slot />
  </CollapsibleRoot>
</template>
