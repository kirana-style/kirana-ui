<script lang="ts">
  import { css } from "@kirana-style/core"

  import { Field, FieldDescription, FieldLabel } from "../ui/field"
  import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control"
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

  const PRICES: Record<string, string> = {
    monthly: "$12 a month",
    yearly: "$120 a year",
  }

  let billing = $state("monthly")
</script>

<div sx={page.example}>
  <Field sx={page.narrow}>
    <FieldLabel id="segmented-control-form-label">Billing</FieldLabel>
    <div sx={styles.row}>
      <SegmentedControl aria-labelledby="segmented-control-form-label" bind:value={billing}>
        <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
        <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
      </SegmentedControl>
      <span sx={styles.value} aria-live="polite">
        {PRICES[billing]}
      </span>
    </div>
    <FieldDescription>Change the plan at any time.</FieldDescription>
  </Field>
</div>
