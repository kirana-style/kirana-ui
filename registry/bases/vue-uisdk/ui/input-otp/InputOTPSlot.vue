<script setup lang="ts">
import { OTPInputSlot } from "@ui-sdk/vue/otp-input"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { inputOtp } from "../../../../styles/input-otp.styles"

defineOptions({ inheritAttrs: false })

const { index } = defineProps<{ index: number }>()
const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="OTPInputSlot"
    name="input-otp-slot"
    tag="div"
    :index="index"
    v-bind="attrs"
    :sx="[inputOtp.slot, sx]"
  />
</template>
