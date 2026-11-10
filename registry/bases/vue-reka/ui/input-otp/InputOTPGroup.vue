<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { inputOtp } from "../../../../styles/input-otp.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="input-otp-group" v-bind="attrs" :sx="[inputOtp.group, sx]">
    <slot />
  </div>
</template>
