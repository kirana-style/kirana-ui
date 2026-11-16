<script setup lang="ts">
import { ToggleGroup } from "@ui-sdk/vue/toggle"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { provide, reactive, toRef } from "vue"

import { toggleGroup } from "../../../../styles/toggle-group.styles"
import type { toggle } from "../../../../styles/toggle.styles"
import { TOGGLE_GROUP } from "./context"

defineOptions({ inheritAttrs: false })

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

const props = withDefaults(
  defineProps<{
    variant?: ToggleVariants["variant"]
    size?: ToggleVariants["size"]
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }>(),
  { spacing: 2, orientation: "horizontal" }
)
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
  <UisdkPart
    :part="ToggleGroup"
    slot-name="toggle-group"
    tag="div"
    :data-variant="variant"
    :data-size="size"
    :data-spacing="spacing"
    :data-orientation="orientation"
    :orientation="orientation"
    :style="{ '--gap': spacing }"
    v-bind="attrs"
    :sx="[toggleGroup.root, sx]"
  >
    <slot />
  </UisdkPart>
</template>
