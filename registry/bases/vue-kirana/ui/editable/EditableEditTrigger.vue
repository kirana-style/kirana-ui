<script setup lang="ts">
import { Editable } from "@kirana-ui/vue/editable"
import { useSx } from "@kirana-style/core/vue"
import { useSlots } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import type { button } from "../../../../styles/button.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/** Starts an edit: a ghost icon button with a pencil unless given a slot. */
const { variant = "ghost", size = "icon-sm" } = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>()
const { sx, attrs } = useSx()
const slots = useSlots()
</script>

<template>
  <Editable.EditTrigger
    data-slot="editable-edit-trigger"
    :aria-label="slots.default ? undefined : 'Edit'"
    v-bind="attrs"
    as-child
  >
    <Button :variant="variant" :size="size" :sx="sx">
      <slot>
        <IconPlaceholder
          lucide="PencilIcon"
          tabler="IconPencil"
          hugeicons="EditIcon"
          phosphor="PencilIcon"
          remixicon="RiPencilLine"
        />
      </slot>
    </Button>
  </Editable.EditTrigger>
</template>
