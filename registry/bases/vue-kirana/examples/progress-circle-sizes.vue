<script setup lang="ts">
import { css } from "@kirana-style/core"

import { ProgressCircle, ProgressCircleLabel } from "../ui/progress-circle"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[6] }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.row">
      <ProgressCircle size="sm" :value="25" aria-label="Small progress">
        <ProgressCircleLabel />
      </ProgressCircle>
      <ProgressCircle :value="50" aria-label="Default progress">
        <ProgressCircleLabel />
      </ProgressCircle>
      <ProgressCircle size="lg" :value="75" aria-label="Large progress">
        <ProgressCircleLabel />
      </ProgressCircle>
    </div>
  </div>
</template>
