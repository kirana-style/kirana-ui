<script setup lang="ts">
import { PinInputInput } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { ref } from "vue"

import { inputOtp } from "../../../../styles/input-otp.styles"

defineOptions({ inheritAttrs: false })

const { index } = defineProps<{ index: number }>()
const { sx, attrs } = useSx()
// The slot holding the focus is the active one, as React's slot marks it.
const active = ref(false)
</script>

<template>
  <!-- Reka's slot is its own input, as Ark UI's is: their styles are one (`slotArk`). -->
  <PinInputInput
    data-slot="input-otp-slot"
    :index="index"
    :data-active="active"
    v-bind="attrs"
    :sx="[inputOtp.slot, inputOtp.slotArk, sx]"
    @focus="active = true"
    @blur="active = false"
  />
</template>
