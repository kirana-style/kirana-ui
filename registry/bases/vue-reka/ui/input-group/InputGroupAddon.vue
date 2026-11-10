<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { inputGroup } from "../../../../styles/input-group.styles"

defineOptions({ inheritAttrs: false })

type AddonOptions = NonNullable<Parameters<typeof inputGroup.addon>[0]>

const { align = "inline-start" } = defineProps<{
  align?: AddonOptions["align"]
}>()
const { sx, attrs } = useSx()

/** A click on the addon, but not on a button in it, focuses the group's input. */
function focusInput(event: MouseEvent) {
  if ((event.target as HTMLElement).closest("button")) return
  ;(event.currentTarget as HTMLElement).parentElement
    ?.querySelector("input")
    ?.focus()
}
</script>

<template>
  <div
    data-slot="input-group-addon"
    role="group"
    :data-align="align"
    @click="focusInput"
    v-bind="attrs"
    :sx="[inputGroup.addonScope, inputGroup.addon({ align }), sx]"
  >
    <slot />
  </div>
</template>
