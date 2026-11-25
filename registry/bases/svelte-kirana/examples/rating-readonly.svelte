<script lang="ts">
  import { css } from "@kirana-style/core"

  import { Rating } from "../ui/rating"
  import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
  import { theme } from "../../../core/tokens"
  import { page } from "../../../styles/page.styles"

  const styles = {
    row: css({ display: "flex", alignItems: "center", gap: space[2] }),
    score: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.medium,
    }),
    count: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      color: theme.mutedForeground,
    }),
  }
</script>

<div sx={page.example}>
  <div sx={styles.row}>
    <Rating size="sm" allowHalf readOnly value={4.5} aria-label="Average rating" />
    <span sx={styles.score}>4.5</span>
    <span sx={styles.count}>(128 reviews)</span>
  </div>
</div>
