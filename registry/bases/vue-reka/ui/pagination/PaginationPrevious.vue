<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import PaginationLink from "./PaginationLink.vue"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { pagination } from "../../../../styles/pagination.styles"

defineOptions({ inheritAttrs: false })

const { text = "Previous" } = defineProps<{ text?: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    v-bind="attrs"
    :sx="[pagination.previous, sx]"
  >
    <IconPlaceholder
      lucide="ChevronLeftIcon"
      tabler="IconChevronLeft"
      hugeicons="ArrowLeft01Icon"
      phosphor="CaretLeftIcon"
      remixicon="RiArrowLeftSLine"
      data-icon="inline-start"
      :sx="pagination.flip"
    />
    <span :sx="pagination.text">{{ text }}</span>
  </PaginationLink>
</template>
