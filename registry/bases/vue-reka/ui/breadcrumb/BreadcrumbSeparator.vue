<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { breadcrumb } from "../../../../styles/breadcrumb.styles"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    v-bind="attrs"
    :sx="[breadcrumb.separator, sx]"
  >
    <slot>
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
      />
    </slot>
  </li>
</template>
