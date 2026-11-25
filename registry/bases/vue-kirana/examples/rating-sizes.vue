<script setup lang="ts">
import { css } from "@kirana-style/core"

import { Rating } from "../ui/rating"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  column: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[4],
  }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.column">
      <Rating size="sm" :default-value="3" aria-label="Small rating" />
      <Rating :default-value="3" aria-label="Default rating" />
      <Rating size="lg" :default-value="3" aria-label="Large rating" />
    </div>
  </div>
</template>
