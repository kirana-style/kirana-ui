<script setup lang="ts">
import { css } from "@kirana-style/core"
import { ref } from "vue"

import { Field, FieldLabel } from "../ui/field"
import { Rating } from "../ui/rating"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[3] }),
  value: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
}

const value = ref(3.5)
</script>

<template>
  <div :sx="page.example">
    <Field :sx="page.narrow">
      <FieldLabel id="rating-half-label">Sound quality</FieldLabel>
      <div :sx="styles.row">
        <Rating
          aria-labelledby="rating-half-label"
          allow-half
          v-model:value="value"
        />
        <span :sx="styles.value">{{ value.toFixed(1) }} / 5</span>
      </div>
    </Field>
  </div>
</template>
