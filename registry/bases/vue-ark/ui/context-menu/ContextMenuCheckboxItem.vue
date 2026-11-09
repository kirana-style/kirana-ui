<script setup lang="ts">
import { MenuCheckboxItem, MenuItemIndicator } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { ref, useId } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  menuCheckableRowPadding,
  menuRowBase,
} from "../../../../styles/menu.styles"
import { contextMenu } from "../../../../styles/context-menu.styles"

defineOptions({ inheritAttrs: false })

// Ark names every item with `value`, which its select events report; one without it gets its own.
// `v-model:checked`, or `defaultChecked` for an item that keeps its own, as Base UI's.
const {
  value,
  defaultChecked = false,
  inset = false,
} = defineProps<{ value?: string; defaultChecked?: boolean; inset?: boolean }>()
// `null` while the caller keeps none: a boolean model would read an absent one as `false`.
const checked = defineModel<boolean | null>("checked", { default: null })
const own = ref(defaultChecked)
const { sx, attrs } = useSx()
const id = useId()
</script>

<template>
  <MenuCheckboxItem
    data-slot="context-menu-checkbox-item"
    :close-on-select="false"
    :value="value ?? id"
    :checked="checked ?? own"
    @update:checked="(next: boolean) => ((own = next), (checked = next))"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow, sx]"
  >
    <span :sx="contextMenu.indicator">
      <MenuItemIndicator>
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </MenuItemIndicator>
    </span>
    <slot />
  </MenuCheckboxItem>
</template>
