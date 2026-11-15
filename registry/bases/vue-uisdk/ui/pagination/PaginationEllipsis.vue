<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { pagination } from "../../../../styles/pagination.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span
    aria-hidden="true"
    data-slot="pagination-ellipsis"
    v-bind="attrs"
    :sx="[pagination.ellipsis, sx]"
  >
    <IconPlaceholder
      lucide="MoreHorizontalIcon"
      tabler="IconDots"
      hugeicons="MoreHorizontalCircle01Icon"
      phosphor="DotsThreeIcon"
      remixicon="RiMoreLine"
    />
    <span :sx="visuallyHidden">More pages</span>
  </span>
</template>
