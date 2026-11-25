<script setup lang="ts">
import type { ChangeDetails } from "@kirana-ui/vue"
import { ToggleGroup } from "@kirana-ui/vue/toggle-group"
import { useSx } from "@kirana-style/core/vue"
import { provide, toRef } from "vue"

import { segmentedControl } from "../../../../styles/segmented-control.styles"
import { tabs } from "../../../../styles/tabs.styles"
import { SEGMENTED_CONTROL } from "./context"
import type { SegmentedControlSize } from "./context"

defineOptions({ inheritAttrs: false })

/**
 * One value chosen from a few, on Kirana UI's toggle group: `v-model:value` and `default-value`
 * hold one value, not the group's list. Its other props are the group's (`disabled`, `loop-focus`).
 */
const props = withDefaults(
  defineProps<{
    size?: SegmentedControlSize
    value?: string
    defaultValue?: string
  }>(),
  { size: "default", value: undefined, defaultValue: undefined }
)
const emit = defineEmits<{ "update:value": [value: string] }>()
const { sx, attrs } = useSx()
provide(SEGMENTED_CONTROL, toRef(props, "size"))

function change(next: unknown[], details: ChangeDetails) {
  // One item is always chosen: pressing the chosen one again would leave none, so it is refused.
  if (next.length === 0) {
    details.cancel()
    return
  }
  emit("update:value", next[0] as string)
}
</script>

<template>
  <ToggleGroup
    data-slot="segmented-control"
    :data-size="size"
    :value="value === undefined ? undefined : [value]"
    :default-value="defaultValue === undefined ? undefined : [defaultValue]"
    v-bind="attrs"
    :sx="[tabs.list, tabs.listDefault, segmentedControl.root, sx]"
    @value-change="change"
  >
    <slot />
  </ToggleGroup>
</template>
