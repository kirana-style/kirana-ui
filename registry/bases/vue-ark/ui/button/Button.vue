<script setup lang="ts">
import { ark } from "@ark-ui/vue/factory"
import { props as styleProps } from "@kirana-style/core"
import { h, Text, useSlots } from "vue"
import type { VNode } from "vue"

import { useStyleAttrs } from "../../../../lib/vue"
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

const bound = useStyleAttrs(() =>
  button({ variant: props.variant, size: props.size })
)

const slots = useSlots()
const label = styleProps(buttonLabel).className

/** Each run of text, trimmed to its capitals; icons and elements pass through. */
const Labelled = () =>
  (slots.default?.() ?? []).map((node: VNode) =>
    node.type === Text
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
    v-bind="bound"
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as-child="asChild"
  >
    <slot v-if="asChild" />
    <Labelled v-else />
  </ark.button>
</template>
