<script setup lang="ts">
import { Editable } from "@kirana-ui/vue/editable"
import { useSx } from "@kirana-style/core/vue"

import { editable } from "../../../../styles/editable.styles"

defineOptions({ inheritAttrs: false })

/** Its props are the primitive root's (`v-model:value`, `default-value`, `activation` …). */
const { sx, attrs } = useSx()
</script>

<template>
  <Editable.Root data-slot="editable" v-bind="attrs" :sx="[editable.root, sx]">
    <slot />
  </Editable.Root>
</template>
