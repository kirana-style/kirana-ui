import { createSignal, splitProps } from "solid-js"
import { css } from "@kirana-style/core"
import { Example } from "../../components/example"
import { Calendar } from "../../ui/calendar"
import { Card, CardContent } from "../../ui/card"
import type { Sx } from "@kirana-style/core"

export function CalendarWeekNumbers(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const styles = {
    mxAutoWFitP0: css({
      marginInline: "auto",
      width: "fit-content",
      padding: { "*": null, base: "0" },
    }),
    p0: css({ padding: { "*": null, base: "0" } }),
    justifyCenter: css({ justifyContent: "center" }),
  }

  const [date, setDate] = createSignal<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  )

  return (
    <Example
      title="Week Numbers"
      class={local.class}
      sx={[styles.justifyCenter, local.sx]}
      {...rest}
    >
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="single"
            defaultMonth={date()}
            selected={date()}
            onSelectedChange={(details: {
              selected: ReturnType<typeof date>
            }) => setDate(details.selected)}
            showWeekNumber
          />
        </CardContent>
      </Card>
    </Example>
  )
}
