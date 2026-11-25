<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { marquee } from "../../../../styles/marquee.styles"

defineOptions({ inheritAttrs: false })

/** One run of the items. The marquee draws it twice; a caller rarely writes it. */
const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="marquee-content" v-bind="attrs" :sx="[marquee.content, sx]">
    <slot />
  </div>
</template>
