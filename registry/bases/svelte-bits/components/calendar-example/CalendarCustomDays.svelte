<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { css } from "@kirana-style/core"
  import { addDays } from "date-fns"
  import type { DateRange } from "../../ui/calendar"
  import { Example } from "../../components/example"
  import { Calendar } from "../../ui/calendar"
  import { Card, CardContent } from "../../ui/card"
  import { breakpoint, spacing } from "../../../../core/scales"
  import { calendarCtx } from "../../../../core/context"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    mxAutoWFitP0: css({
      marginInline: "auto",
      width: "fit-content",
      padding: { "*": null, base: "0" },
    }),
    p0: css({ padding: { "*": null, base: "0" } }),
    cellSizeSpacing10MdCellS: css({
      [calendarCtx.cellSize]: {
        "*": null,
        base: spacing(10),
        [breakpoint.md]: spacing(12),
      },
    }),
  }

  let range = $state<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
  })
</script>

<Example title="Custom Days" {...rest} sx={className as Sx}>
  <Card sx={styles.mxAutoWFitP0}>
    <CardContent sx={styles.p0}>
      <Calendar mode="range" defaultMonth={range?.from} selected={range} onSelectedChange={(details: { selected: typeof range }) => (range = details.selected)} numberOfMonths={1} captionLayout="dropdown" sx={styles.cellSizeSpacing10MdCellS} formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString('default', { month: 'long' })
            },
          }}>
        {#snippet day({ date, outside })}
          {date.getDate()}
          {#if !outside}
            <span>
              {date.getDay() === 0 || date.getDay() === 6 ? "$120" : "$100"}
            </span>
          {/if}
        {/snippet}
      </Calendar>
    </CardContent>
  </Card>
</Example>
