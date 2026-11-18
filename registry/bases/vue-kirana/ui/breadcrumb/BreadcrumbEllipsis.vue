<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { breadcrumb } from "../../../../styles/breadcrumb.styles"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    v-bind="attrs"
    :sx="[breadcrumb.ellipsis, sx]"
  >
    <IconPlaceholder
      lucide="MoreHorizontalIcon"
      tabler="IconDots"
      hugeicons="MoreHorizontalCircle01Icon"
      phosphor="DotsThreeIcon"
      remixicon="RiMoreLine"
    />
    <span :sx="visuallyHidden">More</span>
  </span>
</template>
