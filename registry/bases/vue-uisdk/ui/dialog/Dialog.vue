<script setup lang="ts">
import { Dialog } from "@ui-sdk/vue/dialog"
import { provide, reactive } from "vue"

import {
  endScrollAnimations,
  popupContainer,
} from "../../../../lib/vue/uisdk-slot"
import { CONTENT } from "./context"

/**
 * ui-sdk's dialog, `v-model:open` passing through as Ark UI's part passes it. Its popup renders in
 * the body; as it closes, its content's scroll-driven animations end (LF-024).
 */
const content = reactive({ el: null as HTMLElement | null })
provide(CONTENT, content)
// Before ui-sdk gathers what its exit waits for. The caller's `open` and `update:open`
// (`v-model:open`) pass through to ui-sdk's root, as Ark UI's part passes them to its own.
const closing = (value: boolean) => {
  if (!value) endScrollAnimations(content.el)
}
</script>

<template>
  <Dialog
    data-slot="dialog"
    :container="popupContainer()"
    @update:open="closing"
    v-bind="$attrs"
  >
    <slot />
  </Dialog>
</template>
