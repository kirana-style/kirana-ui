<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"

import { ProgressCircle, ProgressCircleLabel } from "../ui/progress-circle"
import { page } from "../../../styles/page.styles"

const progress = ref(13)
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  timer = setTimeout(() => (progress.value = 66), 500)
})
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <div :sx="page.example">
    <ProgressCircle :value="progress" size="lg" aria-label="Upload progress">
      <ProgressCircleLabel />
    </ProgressCircle>
  </div>
</template>
