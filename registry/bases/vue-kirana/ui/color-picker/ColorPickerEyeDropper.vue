<script setup lang="ts">
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

/** A ghost icon Button that picks a colour from the screen; hidden where the browser has no eye dropper. */
const { sx, attrs } = useSx()
</script>

<template>
  <ColorPicker.EyeDropperTrigger
    data-slot="color-picker-eye-dropper"
    v-bind="attrs"
    as-child
  >
    <Button variant="ghost" size="icon" :sx="sx">
      <slot>
        <IconPlaceholder
          lucide="PipetteIcon"
          tabler="IconColorPicker"
          hugeicons="PipetteIcon"
          phosphor="EyedropperIcon"
          remixicon="RiDropperLine"
        />
        <span :sx="visuallyHidden">Pick a colour from the screen</span>
      </slot>
    </Button>
  </ColorPicker.EyeDropperTrigger>
</template>
