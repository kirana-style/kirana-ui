<script setup lang="ts">
import { DirectionProvider } from "@kirana-ui/vue/direction"
import { computed } from "vue"

/**
 * The reading direction for every part inside, from a locale as Vue's Ark UI parts take it
 * (`<DirectionProvider locale="ar">`, Base UI's `<DirectionProvider direction="rtl">`): Kirana
 * UI's provider takes the direction.
 */
const { locale = "en-US" } = defineProps<{ locale?: string }>()

const RTL = new Set(["ar", "fa", "he", "ur", "ps", "dv", "yi", "ckb"])
const direction = computed(() =>
  RTL.has(locale.split("-")[0]!.toLowerCase()) ? "rtl" : "ltr"
)
</script>

<template>
  <DirectionProvider :direction="direction">
    <slot />
  </DirectionProvider>
</template>
