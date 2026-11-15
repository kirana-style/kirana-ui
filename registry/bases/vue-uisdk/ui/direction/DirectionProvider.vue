<script setup lang="ts">
import { computed, provide } from "vue"

import { DIRECTION } from "./direction"

/**
 * The reading direction for every part inside, from a locale as Vue's Ark UI parts take it
 * (`<DirectionProvider locale="ar">`, Base UI's `<DirectionProvider direction="rtl">`). ui-sdk's
 * parts read the direction the element is laid out in (`dir`), so the provider only answers
 * `useDirection()` for the parts and examples that ask.
 */
const { locale = "en-US" } = defineProps<{ locale?: string }>()

const RTL = new Set(["ar", "fa", "he", "ur", "ps", "dv", "yi", "ckb"])
provide(
  DIRECTION,
  computed(() => ({
    locale,
    dir: RTL.has(locale.split("-")[0]!.toLowerCase())
      ? ("rtl" as const)
      : ("ltr" as const),
  }))
)
</script>

<template>
  <slot />
</template>
