<script setup lang="ts">
import { ark } from "@ark-ui/vue/factory"
import { props as styleProps } from "@kirana-style/core"
import { h, Text, useSlots } from "vue"
import type { VNode } from "vue"
import { useSx } from "@kirana-style/core/vue"

import { button, buttonLabel } from "../../../../styles/button.styles"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    asChild?: boolean
  }>(),
  { variant: "default", size: "default", asChild: false }
)

const { sx, attrs } = useSx()

const slots = useSlots()
const label = styleProps(buttonLabel).className

/**
 * Each run of text, trimmed to its capitals; icons and elements pass through. White space alone
 * stays bare text, which the flex container drops: a label of its own would add a gap.
 */
const Labelled = () =>
  (slots.default?.() ?? []).map((node: VNode) =>
    node.type === Text && String(node.children).trim()
      ? h(
          "span",
          { "data-slot": "button-label", class: label },
          node.children as string
        )
      : node
  )
</script>

<template>
  <ark.button
    v-bind="attrs"
    :sx="[button({ variant: props.variant, size: props.size }), sx]"
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as-child="asChild"
  >
    <slot v-if="asChild" />
    <Labelled v-else />
  </ark.button>
</template>
