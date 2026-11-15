<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { inputOtp } from "../../../../styles/input-otp.styles"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="input-otp-separator"
    role="separator"
    v-bind="attrs"
    :sx="[inputOtp.separator, sx]"
  >
    <IconPlaceholder
      lucide="MinusIcon"
      tabler="IconMinus"
      hugeicons="MinusSignIcon"
      phosphor="MinusIcon"
      remixicon="RiSubtractLine"
    />
  </div>
</template>
