<script setup lang="ts">
import { Tour } from "@kirana-ui/vue/tour"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { dialog } from "../../../../styles/dialog.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

/** A ghost icon Button in the popup's corner that ends the tour. */
const { sx, attrs } = useSx()
</script>

<template>
  <Tour.Close data-slot="tour-close" v-bind="attrs" as-child>
    <Button variant="ghost" size="icon-sm" :sx="[dialog.close, sx]">
      <slot>
        <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="Cancel01Icon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
        />
        <span :sx="visuallyHidden">Close</span>
      </slot>
    </Button>
  </Tour.Close>
</template>
