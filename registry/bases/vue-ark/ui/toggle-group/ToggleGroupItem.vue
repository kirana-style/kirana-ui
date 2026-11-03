<script setup lang="ts">
import { ToggleGroupItem } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject } from "vue"

import { toggleGroup } from "../../../../styles/toggle-group.styles"
import { toggle, toggleScope } from "../../../../styles/toggle.styles"
import { TOGGLE_GROUP } from "./context"

defineOptions({ inheritAttrs: false })

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

const props = withDefaults(
  defineProps<{
    value: string
    variant?: ToggleVariants["variant"]
    size?: ToggleVariants["size"]
  }>(),
  { variant: "default", size: "default" }
)
const { sx, attrs } = useSx()

const context = inject(TOGGLE_GROUP, undefined)
const chosen = computed(() => ({
  variant: context?.variant || props.variant,
  size: context?.size || props.size,
}))
</script>

<template>
  <ToggleGroupItem
    data-slot="toggle-group-item"
    :value="value"
    :data-variant="chosen.variant"
    :data-size="chosen.size"
    :data-spacing="context?.spacing ?? 2"
    v-bind="attrs"
    :sx="[toggleScope.anchor, toggle(chosen), toggleGroup.item, sx]"
  >
    <slot />
  </ToggleGroupItem>
</template>
