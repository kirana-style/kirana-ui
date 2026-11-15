<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Progress, ProgressLabel, ProgressValue } from "../ui/progress"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
}
</script>

<template>
  <div :sx="page.example">
    <Progress :value="56" :sx="styles.narrowSm">
      <ProgressLabel>Upload progress</ProgressLabel>
      <ProgressValue />
    </Progress>
  </div>
</template>
