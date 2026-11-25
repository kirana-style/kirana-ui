<script setup lang="ts">
import { PasswordInput } from "@kirana-ui/vue/password-input"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { passwordInput } from "../../../../styles/password-input.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- An eye, struck through while the password can be read; a slot replaces it. -->
  <PasswordInput.Indicator
    v-slot="{ state }"
    data-slot="password-input-indicator"
    v-bind="attrs"
    :sx="[passwordInput.indicator, sx]"
  >
    <slot>
      <IconPlaceholder
        v-if="state.visible"
        lucide="EyeOffIcon"
        tabler="IconEyeClosed"
        hugeicons="ViewOffIcon"
        phosphor="EyeSlashIcon"
        remixicon="RiEyeOffLine"
      />
      <IconPlaceholder
        v-else
        lucide="EyeIcon"
        tabler="IconEye"
        hugeicons="EyeIcon"
        phosphor="EyeIcon"
        remixicon="RiEyeLine"
      />
    </slot>
  </PasswordInput.Indicator>
</template>
