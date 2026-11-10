<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { inputGroup } from "../../../../styles/input-group.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

type ButtonOptions = NonNullable<Parameters<typeof inputGroup.button>[0]>

const {
  type = "button",
  variant = "ghost",
  size = "xs",
} = defineProps<{
  type?: "button" | "submit" | "reset"
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link"
  size?: ButtonOptions["size"]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Button
    :type="type"
    :data-size="size"
    :variant="variant"
    v-bind="attrs"
    :sx="[inputGroup.button({ size }), sx]"
  >
    <slot />
  </Button>
</template>
