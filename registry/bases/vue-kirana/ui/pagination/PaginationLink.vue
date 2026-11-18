<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { Button } from "../button"
import type { button } from "../../../../styles/button.styles"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

const { isActive = false, size = "icon" } = defineProps<{
  isActive?: boolean
  size?: ButtonVariants["size"]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Button
    :variant="isActive ? 'outline' : 'ghost'"
    :size="size"
    :sx="sx"
    as-child
  >
    <a
      :aria-current="isActive ? 'page' : undefined"
      data-slot="pagination-link"
      :data-active="isActive || undefined"
      v-bind="attrs"
    >
      <slot />
    </a>
  </Button>
</template>
