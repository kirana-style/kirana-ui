<script setup lang="ts">
import { ContextMenu } from "@kirana-ui/vue/context-menu"
import { useSx } from "@kirana-style/core/vue"
import { ref } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { contextMenu } from "../../../../styles/context-menu.styles"
import {
  menuCheckableRowPadding,
  menuRowBase,
} from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

// `v-model:checked`, or `defaultChecked` for an item that keeps its own, as Base UI's. `value` is
// accepted for markup written for Ark UI, which names its items; Kirana UI's need none.
const {
  defaultChecked = false,
  inset = false,
  closeOnSelect = false,
} = defineProps<{
  value?: string
  defaultChecked?: boolean
  inset?: boolean
  /** Closes the menu when chosen, as Ark UI's `close-on-select`; Base UI's stays open. */
  closeOnSelect?: boolean
}>()
// `null` while the caller keeps none: a boolean model would read an absent one as `false`.
const checked = defineModel<boolean | null>("checked", { default: null })
const own = ref(defaultChecked)
const { sx, attrs } = useSx()
</script>

<template>
  <!-- Stays open when chosen, as Base UI's, unless `close-on-select`. -->
  <ContextMenu.CheckboxItem
    data-slot="context-menu-checkbox-item"
    :checked="checked ?? own"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow, sx]"
    :close-on-click="closeOnSelect"
    @checked-change="(next: boolean) => ((own = next), (checked = next))"
  >
    <span :sx="contextMenu.indicator">
      <ContextMenu.CheckboxItemIndicator>
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </ContextMenu.CheckboxItemIndicator>
    </span>
    <slot />
  </ContextMenu.CheckboxItem>
</template>
