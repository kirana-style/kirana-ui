<script lang="ts">
  import { css } from "@kirana-style/core"
  import { addDays } from "date-fns"
  import type { DateRange } from "../ui/calendar"
  import { Calendar } from "../ui/calendar"
  import { radius, theme } from "../../../core/tokens"
  import { page } from "../../../styles/page.styles"

  const styles = {
    bordered: css({
      borderRadius: radius.lg,
      borderWidth: "1px",
      borderColor: theme.border,
    }),
  }

  let dateRange = $state<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })
</script>

<div sx={page.example}>
  <Calendar mode="range" defaultMonth={dateRange?.from} selected={dateRange} onSelectedChange={(details: { selected: typeof dateRange }) => (dateRange = details.selected)} numberOfMonths={2} sx={styles.bordered} />
</div>
