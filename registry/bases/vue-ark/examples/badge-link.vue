<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Badge } from "../ui/badge"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Badge as-child>
      <a href="#link">
        Open Link
        <IconPlaceholder
          lucide="ArrowUpRightIcon"
          tabler="IconArrowUpRight"
          hugeicons="ArrowUpRightIcon"
          phosphor="ArrowUpRightIcon"
          remixicon="RiArrowRightUpLine"
          data-icon="inline-end"
        />
      </a>
    </Badge>
  </div>
</template>
