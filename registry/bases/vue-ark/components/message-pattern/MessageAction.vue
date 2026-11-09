<script setup lang="ts">
import { Button } from "../../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"

defineOptions({ inheritAttrs: false })

const { label } = defineProps<{
  label: string
}>()
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button
        variant="ghost"
        size="icon-sm"
        :aria-label="label"
        v-bind="$attrs"
      >
        <slot />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>
        {{ label }}
      </p>
    </TooltipContent>
  </Tooltip>
</template>
