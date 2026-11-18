<script setup lang="ts">
import { Resizable } from "@kirana-ui/vue/resizable"
import { computed, inject } from "vue"

import { resizable } from "../../../../styles/resizable.styles"
import { RESIZABLE } from "./context"

const { id } = defineProps<{ id: string }>()
const sizes = inject(RESIZABLE, undefined)
const own = computed(() => sizes?.(id) ?? {})
</script>

<template>
  <Resizable.Panel
    data-slot="resizable-panel"
    :default-size="own.defaultSize"
    :min-size="own.minSize"
    :max-size="own.maxSize"
    :sx="resizable.panelKirana"
  >
    <slot />
  </Resizable.Panel>
</template>
