<script setup lang="ts">
import { PasswordInput } from "@kirana-ui/vue/password-input"
import { useSx } from "@kirana-style/core/vue"

import { input } from "../../../../styles/input.styles"
import { inputGroup } from "../../../../styles/input-group.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <PasswordInput.Input
    data-slot="password-input-input"
    v-bind="attrs"
    :sx="[input, inputGroup.input, sx]"
  />
</template>
