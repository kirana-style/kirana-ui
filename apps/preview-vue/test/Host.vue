<!-- An item as the preview's page holds it (`src/App.vue`): its base's direction and locale
     provider, and the language's context, from the page's design. -->
<script setup lang="ts">
import { LocaleProvider } from "@ark-ui/vue"
import type { Component } from "vue"
import { computed, provide } from "vue"
import { ConfigProvider } from "reka-ui"

import { LANGUAGE } from "@workspace/registry/bases/vue-ark/components/language-selector/index.ts"
import { previewDirection } from "@workspace/registry/core/preview.ts"

import { design } from "../src/design"

const props = defineProps<{ base: string; item: Component }>()

provide(
  LANGUAGE,
  computed(() => design.value.options.language)
)
const direction = computed(() => previewDirection(design.value.options))
</script>

<template>
  <ConfigProvider v-if="props.base === 'reka'" :dir="direction" locale="en-US">
    <component :is="props.item" />
  </ConfigProvider>
  <LocaleProvider v-else locale="en-US">
    <component :is="props.item" />
  </LocaleProvider>
</template>
