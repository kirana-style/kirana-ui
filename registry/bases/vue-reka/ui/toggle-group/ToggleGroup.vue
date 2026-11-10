<script setup lang="ts">
import { ToggleGroupRoot } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed, provide, reactive, toRef } from "vue"

import { toggleGroup } from "../../../../styles/toggle-group.styles"
import type { toggle } from "../../../../styles/toggle.styles"
import { TOGGLE_GROUP } from "./context"

defineOptions({ inheritAttrs: false })

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

// Base UI's props, as on Ark UI: `multiple`, and a value that is always a list. Reka's single
// group takes one value, so the list's first goes in and comes back out as a list.
const props = withDefaults(
  defineProps<{
    variant?: ToggleVariants["variant"]
    size?: ToggleVariants["size"]
    spacing?: number
    orientation?: "horizontal" | "vertical"
    multiple?: boolean
    defaultValue?: string[]
    modelValue?: string[]
  }>(),
  {
    spacing: 2,
    orientation: "horizontal",
    defaultValue: undefined,
    modelValue: undefined,
  }
)
const emit = defineEmits<{ "update:modelValue": [value: string[]] }>()
const { sx, attrs } = useSx()

const one = (value: string[] | undefined) =>
  props.multiple ? value : value && value[0]
const told = computed(() => one(props.modelValue))

provide(
  TOGGLE_GROUP,
  reactive({
    variant: toRef(props, "variant"),
    size: toRef(props, "size"),
    spacing: toRef(props, "spacing"),
  })
)
</script>

<template>
  <!-- The gap, in steps of 0.25rem, as upstream hands it down. -->
  <ToggleGroupRoot
    data-slot="toggle-group"
    :type="multiple ? 'multiple' : 'single'"
    :default-value="one(defaultValue)"
    :model-value="told"
    :data-variant="variant"
    :data-size="size"
    :data-spacing="spacing"
    :data-orientation="orientation"
    :orientation="orientation"
    :style="{ '--gap': spacing }"
    v-bind="attrs"
    :sx="[toggleGroup.root, sx]"
    @update:model-value="
      (value: unknown) =>
        emit(
          'update:modelValue',
          Array.isArray(value) ? value : value ? [value as string] : []
        )
    "
  >
    <slot />
  </ToggleGroupRoot>
</template>
