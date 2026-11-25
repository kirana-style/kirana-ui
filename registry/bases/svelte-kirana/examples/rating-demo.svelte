<script lang="ts">
  import { css } from "@kirana-style/core"

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

  const WORDS = ["No rating", "Poor", "Fair", "Good", "Very good", "Excellent"]

  let value = $state(4)
</script>

<div sx={page.example}>
  <Field sx={page.narrow}>
    <FieldLabel id="rating-demo-label">Rate your stay</FieldLabel>
    <div sx={styles.row}>
      <Rating aria-labelledby="rating-demo-label" bind:value />
      <span sx={styles.value} aria-live="polite">
        {WORDS[value]}
      </span>
    </div>
  </Field>
</div>
