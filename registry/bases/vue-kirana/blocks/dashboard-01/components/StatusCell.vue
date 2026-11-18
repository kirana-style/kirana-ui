<script setup lang="ts">
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import { Badge } from "../../../ui/badge"
import { styles } from "./data-table"

defineProps<{ status: string }>()
</script>

<template>
  <Badge variant="outline" :sx="styles.badge2">
    <IconPlaceholder
      v-if="status === 'Done'"
      lucide="CircleCheckIcon"
      tabler="IconCircleCheckFilled"
      hugeicons="CheckmarkCircle01Icon"
      phosphor="CheckCircleIcon"
      remixicon="RiCheckboxCircleFill"
      :sx="styles.iconPlaceholder"
    />
    <IconPlaceholder
      v-else
      lucide="LoaderIcon"
      tabler="IconLoader"
      hugeicons="Loading03Icon"
      phosphor="SpinnerIcon"
      remixicon="RiLoader4Line"
    />
    {{ status }}
  </Badge>
</template>
