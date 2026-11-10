<script setup lang="ts">
import { CollapsibleContent, injectCollapsibleRootContext } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject } from "vue"

import { COLLAPSIBLE_PANEL } from "./panel"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const panel = inject(COLLAPSIBLE_PANEL, undefined)
const root = injectCollapsibleRootContext()
const style = computed(() => ({
  // The panel's measured height as Ark UI names it, which the panels' motion reads.
  "--height": "var(--reka-collapsible-content-height)",
  // A panel kept in the page while closed is `hidden`, as Base UI's (Reka's is `until-found`).
  display: root.open.value || root.unmountOnHide.value ? undefined : "none",
}))
const attach = (element: unknown) =>
  panel?.attach(
    (element as { $el?: Element } | null)?.$el ??
      (element as Element | undefined)
  )
</script>

<template>
  <CollapsibleContent
    v-if="panel?.mounted.value ?? true"
    :ref="attach"
    data-slot="collapsible-content"
    :style="style"
    v-bind="attrs"
    :sx="sx"
    @animationend="
      (event: AnimationEvent) =>
        event.target === event.currentTarget && panel?.settle()
    "
  >
    <slot />
  </CollapsibleContent>
</template>
