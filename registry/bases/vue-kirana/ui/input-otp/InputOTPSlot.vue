<script setup lang="ts">
import { Otp } from "@kirana-ui/vue/otp"
import { useSx } from "@kirana-style/core/vue"

import { inputOtp } from "../../../../styles/input-otp.styles"

defineOptions({ inheritAttrs: false })

const { index } = defineProps<{ index: number }>()
const { sx, attrs } = useSx()
</script>

<template>
  <!-- The cell writes its character; the caret is drawn while it is the active, empty one. -->
  <Otp.Slot
    data-slot="input-otp-slot"
    :index="index"
    v-bind="attrs"
    :sx="[inputOtp.slot, sx]"
  >
    <Otp.Caret :sx="inputOtp.caret">
      <div :sx="inputOtp.caretLine" />
    </Otp.Caret>
  </Otp.Slot>
</template>
