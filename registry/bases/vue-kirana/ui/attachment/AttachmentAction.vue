<script setup lang="ts">
import type { button } from "../../../../styles/button.styles"
import { Button } from "../button"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

const { variant = "ghost", size = "icon-xs" } = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>()
</script>

<template>
  <Button data-slot="attachment-action" :variant="variant" :size="size">
    <slot />
  </Button>
</template>
