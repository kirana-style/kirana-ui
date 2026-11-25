<script setup lang="ts">
import { PasswordInput } from "@kirana-ui/vue/password-input"
import { useSx } from "@kirana-style/core/vue"

import { button } from "../../../../styles/button.styles"
import { inputGroup } from "../../../../styles/input-group.styles"
import PasswordInputIndicator from "./PasswordInputIndicator.vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- The show/hide button, in its addon at the field's inline end; it draws its indicator unless
       given a slot. -->
  <div
    data-slot="password-input-addon"
    data-align="inline-end"
    :sx="inputGroup.addon({ align: 'inline-end' })"
  >
    <PasswordInput.Toggle
      data-slot="password-input-toggle"
      data-size="icon-xs"
      v-bind="attrs"
      :sx="[
        button({ variant: 'ghost' }),
        inputGroup.button({ size: 'icon-xs' }),
        sx,
      ]"
    >
      <slot><PasswordInputIndicator /></slot>
    </PasswordInput.Toggle>
  </div>
</template>
