<script setup lang="ts">
import { ToggleGroup } from "@kirana-ui/vue/toggle-group"
import { useSx } from "@kirana-style/core/vue"
import { provide, reactive, toRef } from "vue"

import { toggleGroup } from "../../../../styles/toggle-group.styles"
import type { toggle } from "../../../../styles/toggle.styles"
import { TOGGLE_GROUP } from "./context"

defineOptions({ inheritAttrs: false })

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

/** Kirana UI's toggle group, with Vue's Ark UI parts' `v-model` and `default-value` (a list). */
const props = withDefaults(
  defineProps<{
    variant?: ToggleVariants["variant"]
    size?: ToggleVariants["size"]
    spacing?: number
    orientation?: "horizontal" | "vertical"
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
  <ToggleGroup
    data-slot="toggle-group"
    :default-value="defaultValue"
    :value="modelValue"
    :data-variant="variant"
    :data-size="size"
    :data-spacing="spacing"
    :orientation="orientation"
    :style="{ '--gap': spacing }"
    v-bind="attrs"
    :sx="[toggleGroup.root, sx]"
    @value-change="
      (value: unknown[]) => emit('update:modelValue', value as string[])
    "
  >
    <slot />
  </ToggleGroup>
</template>
