<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import PaginationLink from "./PaginationLink.vue"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { pagination } from "../../../../styles/pagination.styles"

defineOptions({ inheritAttrs: false })

const { text = "Next" } = defineProps<{ text?: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    v-bind="attrs"
    :sx="[pagination.next, sx]"
  >
    <span :sx="pagination.text">{{ text }}</span>
    <IconPlaceholder
      lucide="ChevronRightIcon"
      tabler="IconChevronRight"
      hugeicons="ArrowRight01Icon"
      phosphor="CaretRightIcon"
      remixicon="RiArrowRightSLine"
      data-icon="inline-end"
      :sx="pagination.flip"
    />
  </PaginationLink>
</template>
