<script setup lang="ts">
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <InputOTP :max-length="6" default-value="123456">
      <InputOTPGroup>
        <InputOTPSlot :index="0" />
        <InputOTPSlot :index="1" />
        <InputOTPSlot :index="2" />
        <InputOTPSlot :index="3" />
        <InputOTPSlot :index="4" />
        <InputOTPSlot :index="5" />
      </InputOTPGroup>
    </InputOTP>
  </div>
</template>
