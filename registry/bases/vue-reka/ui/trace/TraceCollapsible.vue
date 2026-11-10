<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { provide, ref } from "vue"

import { trace } from "../../../../styles/trace.styles"
import { Collapsible } from "../collapsible"
import { KEEP_MOUNTED } from "./keep-mounted"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
// Its content asks to stay in the page while closed (`keepMounted`, Base UI's panel's): Reka
// unmounts from the root, so the root lets it.
const keepMounted = ref(false)
provide(KEEP_MOUNTED, keepMounted)
</script>

<template>
  <Collapsible
    data-slot="trace-collapsible"
    :unmount-on-hide="!keepMounted"
    v-bind="attrs"
    :sx="[trace.collapsible, sx]"
  >
    <slot />
  </Collapsible>
</template>
