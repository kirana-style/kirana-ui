<script setup lang="ts">
import { Editable } from "@kirana-ui/vue/editable"
import { useSx } from "@kirana-style/core/vue"
import { useSlots } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import type { button } from "../../../../styles/button.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/** Keeps the edit: a ghost icon button with a check unless given a slot. */
const { variant = "ghost", size = "icon-sm" } = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>()
const { sx, attrs } = useSx()
const slots = useSlots()
</script>

<template>
  <Editable.SubmitTrigger
    data-slot="editable-submit-trigger"
    :aria-label="slots.default ? undefined : 'Save'"
    v-bind="attrs"
    as-child
  >
    <Button :variant="variant" :size="size" :sx="sx">
      <slot>
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </slot>
    </Button>
  </Editable.SubmitTrigger>
</template>
