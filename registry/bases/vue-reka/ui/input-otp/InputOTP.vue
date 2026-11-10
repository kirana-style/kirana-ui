<script setup lang="ts">
import { PinInputRoot } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { inputOtp } from "../../../../styles/input-otp.styles"

defineOptions({ inheritAttrs: false })

// `maxLength`, upstream's name for how many slots there are: the slots the caller renders, which
// Reka counts itself. `v-model` and `value` are the code as one string, as upstream's; Reka's own is
// a character per slot. Any character, as upstream's, unless `type="numeric"` (as on Vue's Ark UI
// parts) narrows it to digits: Reka's `number`.
const { defaultValue, value, type } = defineProps<{
  maxLength: number
  /** Upstream's, one string: Reka's is a character per slot. */
  defaultValue?: string
  value?: string
  type?: "numeric" | "alphabetic" | "alphanumeric"
}>()
const model = defineModel<string>()
const { sx, attrs } = useSx()

const chars = (code: string | undefined) =>
  code === undefined ? undefined : [...code]
</script>

<template>
  <!-- Reka's root writes the hidden input that holds the code, and gives it the root's `id`. -->
  <PinInputRoot
    data-slot="input-otp"
    :type="type === 'numeric' ? 'number' : 'text'"
    :default-value="chars(defaultValue)"
    :model-value="chars(model ?? value)"
    otp
    v-bind="attrs"
    :sx="[inputOtp.container, sx]"
    @update:model-value="(next: string[]) => (model = next.join(''))"
  >
    <div :sx="inputOtp.controlArk">
      <slot />
    </div>
  </PinInputRoot>
</template>
