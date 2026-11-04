import { createSignal, splitProps } from "solid-js"
import { css } from "@kirana-style/core"
import { addDays } from "date-fns"
import { Example } from "../../components/example"
import { Calendar } from "../../ui/calendar"
import { Card, CardContent } from "../../ui/card"
import { breakpoint, space } from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"
import type { DateRange } from "../../ui/calendar"

export function CalendarRange(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const styles = {
    // `lg:col-span-full 2xl:col-span-full`, on an example's container.
    fullRow: css({
      gridColumn: {
        [breakpoint.lg]: "1 / -1",
        [breakpoint["2xl"]]: "1 / -1",
      },
    }),
    mxAutoWFitP0: css({
      marginInline: "auto",
      width: "fit-content",
      padding: { "*": null, base: "0" },
    }),
    p0: css({ padding: { "*": null, base: "0" } }),
    p12: css({ padding: space[12] }),
  }

  const [dateRange, setDateRange] = createSignal<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })

  return (
    <Example
      title="Range"
      containerSx={styles.fullRow}
      class={local.class}
      sx={[styles.p12, local.sx]}
      {...rest}
    >
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="range"
            defaultMonth={dateRange()?.from}
            selected={dateRange()}
            onSelectedChange={(details: {
              selected: ReturnType<typeof dateRange>
            }) => setDateRange(details.selected)}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </CardContent>
      </Card>
    </Example>
  )
}
