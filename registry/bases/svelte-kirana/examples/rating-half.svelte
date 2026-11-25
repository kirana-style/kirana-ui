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

  let value = $state(3.5)
</script>

<div sx={page.example}>
  <Field sx={page.narrow}>
    <FieldLabel id="rating-half-label">Sound quality</FieldLabel>
    <div sx={styles.row}>
      <Rating aria-labelledby="rating-half-label" allowHalf bind:value />
      <span sx={styles.value}>{value.toFixed(1)} / 5</span>
    </div>
  </Field>
</div>
