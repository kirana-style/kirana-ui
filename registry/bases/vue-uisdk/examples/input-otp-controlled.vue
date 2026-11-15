<script setup lang="ts">
import { ref } from "vue"
import { css, select } from "@kirana-style/core"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  spaceY2: css({
    [select.child(":not(:last-child)")]: { marginBottom: space[2] },
  }),
  textCenterTextSm: css({
    textAlign: "center",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

const value = ref("")
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.spaceY2">
      <InputOTP v-model="value" :max-length="6">
        <InputOTPGroup>
          <InputOTPSlot :index="0" />
          <InputOTPSlot :index="1" />
          <InputOTPSlot :index="2" />
          <InputOTPSlot :index="3" />
          <InputOTPSlot :index="4" />
          <InputOTPSlot :index="5" />
        </InputOTPGroup>
      </InputOTP>
      <div :sx="styles.textCenterTextSm">
        <template v-if="value === ''">Enter your one-time password.</template>
        <template v-else>You entered: {{ value }}</template>
      </div>
    </div>
  </div>
</template>
