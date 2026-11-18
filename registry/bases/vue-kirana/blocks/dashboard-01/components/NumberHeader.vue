<script setup lang="ts">
// The target's and the limit's header, aligned as their fields are.
import { styles } from "./data-table"

defineProps<{ field: "target" | "limit" }>()
</script>

<template>
  <div :sx="field === 'target' ? styles.div4 : styles.div5">
    {{ field === "target" ? "Target" : "Limit" }}
  </div>
</template>
