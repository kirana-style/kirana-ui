<script setup lang="ts">
import { Badge } from "../../../ui/badge"
import { styles } from "./data-table"

defineProps<{ type: string }>()
</script>

<template>
  <div :sx="styles.div3">
    <Badge variant="outline" :sx="styles.badge">{{ type }}</Badge>
  </div>
</template>
