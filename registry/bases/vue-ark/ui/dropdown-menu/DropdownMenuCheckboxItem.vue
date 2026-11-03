<script setup lang="ts">
import { MenuCheckboxItem, MenuItemIndicator } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { ref, useId } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"

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
    data-slot="dropdown-menu-checkbox-item"
    :value="value ?? id"
    :checked="checked ?? own"
    @checked-change="(next: boolean) => ((own = next), (checked = next))"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, sx]"
  >
    <span data-slot="dropdown-menu-checkbox-item-indicator" :sx="menuIndicator">
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
