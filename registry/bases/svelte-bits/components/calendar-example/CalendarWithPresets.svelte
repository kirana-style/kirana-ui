<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { css } from "@kirana-style/core"
  import { addDays } from "date-fns"
  import { Example } from "../../components/example"
  import { Button } from "../../ui/button"
  import { Calendar } from "../../ui/calendar"
  import { Card, CardContent, CardFooter } from "../../ui/card"
  import { space, spacing } from "../../../../core/scales"
  import { theme } from "../../../../core/tokens"
  import { calendarCtx, cardCtx } from "../../../../core/context"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    mxAutoWFitMaxW300Px: css({
      marginInline: "auto",
      width: "fit-content",
      maxWidth: { "*": null, base: "300px" },
    }),
    p0CellSizeSpacing95: css({
      padding: { "*": null, base: "0" },
      [calendarCtx.cellSize]: { "*": null, base: spacing(9.5) },
    }),
    flexFlexWrapGap2BorderT: css({
      display: "flex",
      flexWrap: "wrap",
      gap: { "*": null, base: space[2] },
      borderTopWidth: "1px",
      borderTopColor: theme.border,
      // The footer's `[.border-t]:pt-(--card-spacing)`, which a class name cannot reach here.
      paddingBlockStart: cardCtx.spacing,
    }),
    flex1: css({ flex: 1 }),
  }

  let date = $state<Date | undefined>(new Date(new Date().getFullYear(), 1, 12))
  let currentMonth = $state<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )
</script>

<Example title="With Presets" {...rest} sx={className as Sx}>
  <Card sx={styles.mxAutoWFitMaxW300Px} size="sm">
    <CardContent>
      <Calendar mode="single" selected={date} onSelectedChange={(details: { selected: typeof date }) => (date = details.selected)} month={currentMonth} onMonthChange={(details: { month: typeof currentMonth }) => (currentMonth = details.month)} fixedWeeks sx={styles.p0CellSizeSpacing95} />
    </CardContent>
    <CardFooter sx={styles.flexFlexWrapGap2BorderT}>
      {#each [
            { label: 'Today', value: 0 },
            { label: 'Tomorrow', value: 1 },
            { label: 'In 3 days', value: 3 },
            { label: 'In a week', value: 7 },
            { label: 'In 2 weeks', value: 14 },
          ] as preset (preset.value)}
        <Button variant="outline" size="sm" sx={styles.flex1} onclick={
            () => {
              const newDate = addDays(new Date(), preset.value)
              date = newDate
              currentMonth = new Date(
                newDate.getFullYear(),
                newDate.getMonth(),
                1
              )
            }
          }>
          {preset.label}
        </Button>
      {/each}
    </CardFooter>
  </Card>
</Example>
