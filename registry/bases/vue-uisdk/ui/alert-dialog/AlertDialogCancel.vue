<script setup lang="ts">
import { AlertDialogClose } from "@ui-sdk/vue/alert-dialog"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { useSx } from "@kirana-style/core/vue"

import type { button } from "../../../../styles/button.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

const { variant = "outline", size = "default" } = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="AlertDialogClose"
    name="alert-dialog-close"
    tag="button"
    data-slot="alert-dialog-cancel"
    v-bind="attrs"
    as-child
  >
    <Button :variant="variant" :size="size" :sx="sx">
      <slot />
    </Button>
  </UisdkPart>
</template>
