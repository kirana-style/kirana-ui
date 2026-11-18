<script setup lang="ts">
import { ref } from "vue"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp"
import { page } from "../../../styles/page.styles"

const value = ref("000000")
</script>

<template>
  <div :sx="page.example">
    <InputOTP :max-length="6" v-model="value">
      <InputOTPGroup>
        <InputOTPSlot :index="0" aria-invalid="true" />
        <InputOTPSlot :index="1" aria-invalid="true" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot :index="2" aria-invalid="true" />
        <InputOTPSlot :index="3" aria-invalid="true" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot :index="4" aria-invalid="true" />
        <InputOTPSlot :index="5" aria-invalid="true" />
      </InputOTPGroup>
    </InputOTP>
  </div>
</template>
