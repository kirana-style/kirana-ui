<script setup lang="ts">
import { PasswordInput } from "@kirana-ui/vue/password-input"
import { useSx } from "@kirana-style/core/vue"

import { inputGroup } from "../../../../styles/input-group.styles"
import { passwordInput } from "../../../../styles/password-input.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <PasswordInput.Root
    data-slot="password-input"
    v-bind="attrs"
    :sx="[inputGroup.root, passwordInput.root, sx]"
  >
    <slot />
  </PasswordInput.Root>
</template>
