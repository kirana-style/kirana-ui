<script setup lang="ts">
import { ProgressCircle } from "../ui/progress-circle"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <ProgressCircle :value="null" aria-label="Loading" />
  </div>
</template>
