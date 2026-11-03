<script setup lang="ts">
import { PinInputControl, PinInputHiddenInput, PinInputRoot } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { inputOtp } from "../../../../styles/input-otp.styles"

defineOptions({ inheritAttrs: false })

// `maxLength`, upstream's name for how many slots there are: Ark's `count`. `v-model` is the
// code as one string, as upstream's `value`; Ark's own is a character per slot. Any character, as
// upstream's, unless `type` (Ark's `numeric`, `alphabetic`) narrows it: upstream's `pattern`.
const { maxLength, defaultValue } = defineProps<{
  maxLength: number
  /** Upstream's, one string: Ark's is a character per slot. */
  defaultValue?: string
}>()
const model = defineModel<string>()
const { sx, attrs } = useSx()
</script>

<template>
  <PinInputRoot
    data-slot="input-otp"
    :count="maxLength"
    type="alphanumeric"
    :default-value="defaultValue === undefined ? undefined : [...defaultValue]"
    :model-value="model === undefined ? undefined : [...model]"
    otp
    v-bind="attrs"
    :sx="[inputOtp.container, sx]"
    @value-change="model = $event.valueAsString"
  >
    <PinInputControl :sx="inputOtp.controlArk">
      <slot />
    </PinInputControl>
    <PinInputHiddenInput :sx="inputOtp.input" />
  </PinInputRoot>
</template>
