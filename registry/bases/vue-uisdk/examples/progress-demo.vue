<script setup lang="ts">
import { onMounted, ref } from "vue"
import { css } from "@kirana-style/core"
import { Progress } from "../ui/progress"
import { page } from "../../../styles/page.styles"

const styles = {
  w60: css({ width: { "*": null, base: "60%" } }),
}

const progress = ref(13)

onMounted(() => {
  setTimeout(() => (progress.value = 66), 500)
})
</script>

<template>
  <div :sx="page.example">
    <Progress :value="progress" :sx="styles.w60" />
  </div>
</template>
