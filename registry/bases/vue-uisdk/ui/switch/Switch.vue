<script setup lang="ts">
import { Switch, SwitchThumb } from "@ui-sdk/vue/switch"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { switchStyles } from "../../../../styles/switch.styles"

defineOptions({ inheritAttrs: false })

/**
 * ui-sdk's switch: its root is the box (a `span`, as Base UI's), with its thumb. `v-model:checked`
 * and `default-checked`, as Ark UI's part takes them.
 */
const { defaultChecked, size = "default" } = defineProps<{
  /** Base UI's boolean. */
  defaultChecked?: boolean
  size?: "sm" | "default"
}>()
const checked = defineModel<boolean | undefined>("checked", {
  default: undefined,
})
const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Switch"
    name="switch"
    tag="span"
    :data-size="size"
    :default-checked="defaultChecked"
    :checked="checked"
    @update:checked="(value: boolean) => (checked = value)"
    v-bind="attrs"
    :sx="[switchStyles.root, sx]"
  >
    <UisdkPart
      :part="SwitchThumb"
      name="switch-thumb"
      tag="span"
      :sx="switchStyles.thumb"
    />
  </UisdkPart>
</template>
