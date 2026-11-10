<script setup lang="ts">
import { AccordionContent, injectAccordionItemContext } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import { accordion } from "../../../../styles/accordion.styles"
import { ACCORDION_PANELS } from "./panels"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const item = injectAccordionItemContext()
const panels = inject(ACCORDION_PANELS, undefined)
const attach = (element: unknown) =>
  panels?.attach(
    item.value.value,
    (element as { $el?: Element } | null)?.$el ??
      (element as Element | undefined)
  )
</script>

<template>
  <!-- `--height`, the panel's measured height as Ark UI names it, which the panel's motion reads. -->
  <AccordionContent
    v-if="panels?.isMounted(item.value.value) ?? true"
    :ref="attach"
    data-slot="accordion-content"
    :style="{ '--height': 'var(--reka-accordion-content-height)' }"
    v-bind="attrs"
    :sx="[accordion.content, accordion.contentArk]"
    @animationend="
      (event: AnimationEvent) =>
        event.target === event.currentTarget && panels?.settle(item.value.value)
    "
  >
    <div :sx="[accordion.contentInner, sx]">
      <slot />
    </div>
  </AccordionContent>
</template>
