<script setup lang="ts">
import { Steps } from "@kirana-ui/vue/steps"
import { useSx } from "@kirana-style/core/vue"

import type { button } from "../../../../styles/button.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/** Goes to the step after, and from the last to every step done: a Button. */
const { variant = "default", size = "default" } = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Steps.Next data-slot="steps-next" v-bind="attrs" as-child>
    <Button :variant="variant" :size="size" :sx="sx">
      <slot />
    </Button>
  </Steps.Next>
</template>
