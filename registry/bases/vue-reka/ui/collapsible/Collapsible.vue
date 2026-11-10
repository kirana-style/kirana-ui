<script setup lang="ts">
// Unstyled, as upstream's: a caller's `sx` is all it draws.
import { CollapsibleRoot } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { provide, ref } from "vue"

import { COLLAPSIBLE_PANEL, usePanelPresence } from "./panel"

defineOptions({ inheritAttrs: false })

// `v-model:open` and `default-open`, as Reka's, kept here so the panel can enter the page a frame
// before Reka opens it (`panel.ts`). `unmount-on-hide` false keeps it in the page, `hidden`.
const { defaultOpen = false, unmountOnHide = true } = defineProps<{
  defaultOpen?: boolean
  unmountOnHide?: boolean
}>()
const model = defineModel<boolean | undefined>("open", { default: undefined })
const own = ref(defaultOpen)
const requested = () => model.value ?? own.value

const { mounted, open, panel } = usePanelPresence(
  requested,
  () => !unmountOnHide
)
provide(COLLAPSIBLE_PANEL, { ...panel, mounted })

const { sx, attrs } = useSx()
</script>

<template>
  <CollapsibleRoot
    data-slot="collapsible"
    :open="open"
    :unmount-on-hide="unmountOnHide"
    v-bind="attrs"
    :sx="sx"
    @update:open="(next: boolean) => ((own = next), (model = next))"
  >
    <slot />
  </CollapsibleRoot>
</template>
