<script setup lang="ts">
import { ComboboxAnchor, ComboboxTrigger } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { h, mergeProps } from "vue"
import type { FunctionalComponent, VNode } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { combobox } from "../../../../styles/combobox.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{ asChild?: boolean }>()
const slots = defineSlots<{ default?: () => VNode[] }>()
const { sx, attrs } = useSx()

// As Base UI's `render`, the element given as the child takes the trigger's children: the chevron
// (this component's own slot) goes inside it, after its own children, rather than beside it. Reka's
// trigger props, given to this wrapper, go on to the child, over its own. The trigger is Reka's
// anchor, which places the popup against it ("Combobox in Popup").
const Child: FunctionalComponent = (trigger, { slots: own }) => {
  const [child] = slots.default?.() ?? []
  if (!child) return null
  const icon = own.default?.() ?? []
  const props = mergeProps(
    child.props ?? {},
    trigger as Record<string, unknown>
  )
  const children = child.children
  if (children && typeof children === "object" && !Array.isArray(children)) {
    const named = children as Record<string, (() => VNode[]) | undefined>
    return h(child.type as never, props, {
      ...named,
      default: () => [...(named.default?.() ?? []), ...icon],
    })
  }
  return h(child.type as never, props, [
    ...(Array.isArray(children) ? children : children ? [children] : []),
    ...icon,
  ] as VNode[])
}
</script>

<template>
  <ComboboxAnchor as-child>
    <ComboboxTrigger
      v-if="asChild"
      data-slot="combobox-trigger"
      as-child
      v-bind="attrs"
      :sx="[combobox.triggerOwn, sx]"
    >
      <Child>
        <IconPlaceholder
          lucide="ChevronDownIcon"
          tabler="IconChevronDown"
          hugeicons="ArrowDown01Icon"
          phosphor="CaretDownIcon"
          remixicon="RiArrowDownSLine"
          :sx="combobox.triggerIcon"
        />
      </Child>
    </ComboboxTrigger>
    <ComboboxTrigger
      v-else
      data-slot="combobox-trigger"
      v-bind="attrs"
      :sx="[combobox.triggerOwn, sx]"
    >
      <slot />
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        :sx="combobox.triggerIcon"
      />
    </ComboboxTrigger>
  </ComboboxAnchor>
</template>
