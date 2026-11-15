<script setup lang="ts">
import { OTPInput } from "@ui-sdk/vue/otp-input"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { inputOtp } from "../../../../styles/input-otp.styles"

defineOptions({ inheritAttrs: false })

/** ui-sdk's code input: `max-length`, `v-model` and `default-value` as one string, as Ark UI's part takes them. */
const { maxLength, defaultValue } = defineProps<{
  maxLength: number
  defaultValue?: string
}>()
const value = defineModel<string | undefined>({ default: undefined })
const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="OTPInput"
    name="input-otp"
    tag="div"
    :max-length="maxLength"
    :default-value="defaultValue"
    :model-value="value"
    @update:model-value="(next: string) => (value = next)"
    v-bind="attrs"
    :sx="[inputOtp.container, inputOtp.containerUisdk, sx]"
  >
    <slot />
  </UisdkPart>
</template>
