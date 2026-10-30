<script setup lang="ts">
/**
 * `IconPlaceholder` for Vue. The library is the design system's, provided under `ICON_LIBRARY`
 * (`./vue.ts`); the size is the control's (`controlIcons` in `styles/control.ts`).
 */
import { computed, inject, onUnmounted, ref } from "vue"

import { DEFAULT_DESIGN_SYSTEM } from "../core/config"
import { iconDataVersion, resolveIcon, subscribeIconData } from "./data"
import { ICON_LIBRARY } from "./vue"

// Declared here, not imported: Vue resolves an imported props type through TypeScript's JavaScript
// API, which TypeScript 7 does not have.
const props = defineProps<{
  lucide: string
  hugeicons: string
  tabler: string
  phosphor: string
  remixicon: string
}>()
const library = inject(ICON_LIBRARY, ref(DEFAULT_DESIGN_SYSTEM.iconLibrary))
// Draws again when a library's data arrives (Tabler, Phosphor and Remix Icon load on demand).
const version = ref(iconDataVersion())
onUnmounted(subscribeIconData(() => (version.value = iconDataVersion())))
const resolved = computed(
  () => (void version.value, resolveIcon(library.value, props))
)
</script>

<template>
  <svg v-if="resolved" aria-hidden="true" v-bind="resolved.svg">
    <component
      :is="tag"
      v-for="([tag, attributes], index) in resolved.nodes"
      :key="index"
      v-bind="attributes"
    />
  </svg>
</template>
