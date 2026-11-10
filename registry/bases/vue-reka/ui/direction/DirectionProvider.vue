<script setup lang="ts">
import { ConfigProvider } from "reka-ui"
import { computed } from "vue"

/**
 * The reading direction for every part inside, from a locale as Vue's Ark UI parts take it
 * (`<DirectionProvider locale="ar">`, Base UI's `<DirectionProvider direction="rtl">`): Reka UI
 * reads it from its `ConfigProvider`'s `dir`.
 */
const { locale = "en-US" } = defineProps<{ locale?: string }>()

const RTL = new Set(["ar", "fa", "he", "ur", "ps", "dv", "yi", "ckb"])
const dir = computed(() =>
  RTL.has(locale.split("-")[0]!.toLowerCase()) ? "rtl" : "ltr"
)
</script>

<template>
  <ConfigProvider :dir="dir" :locale="locale">
    <slot />
  </ConfigProvider>
</template>
