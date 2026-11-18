<script setup lang="ts">
import { Switch } from "@kirana-ui/vue/switch"
import { useSx } from "@kirana-style/core/vue"

import { switchStyles } from "../../../../styles/switch.styles"

defineOptions({ inheritAttrs: false })

/** Kirana UI's switch, with Vue's Ark UI parts' `checked`, `v-model:checked` and `checked-change`. */
const { defaultChecked, size = "default" } = defineProps<{
  defaultChecked?: boolean
  size?: "sm" | "default"
}>()
const checked = defineModel<boolean | undefined>("checked", {
  default: undefined,
})
const emit = defineEmits<{ checkedChange: [details: { checked: boolean }] }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Switch.Root
    data-slot="switch"
    :data-size="size"
    :default-checked="defaultChecked"
    v-bind="attrs"
    :checked="checked"
    :sx="[switchStyles.root, sx]"
    @checked-change="
      (value: boolean) => (
        (checked = value),
        emit('checkedChange', { checked: value })
      )
    "
  >
    <Switch.Thumb data-slot="switch-thumb" :sx="switchStyles.thumb" />
  </Switch.Root>
</template>
