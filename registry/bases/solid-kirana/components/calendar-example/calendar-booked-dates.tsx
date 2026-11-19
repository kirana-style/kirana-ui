import { createSignal, splitProps } from "solid-js"
import { css, props as styleProps, select } from "@kirana-style/core"
import { Example } from "../../components/example"
import { Calendar } from "../../ui/calendar"
import { Card, CardContent } from "../../ui/card"
import type { Sx } from "@kirana-style/core"

export function CalendarBookedDates(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const styles = {
    // `[&>button]:line-through opacity-100`: a booked day, struck through and not dimmed as disabled.
    booked: css({
      opacity: { '[data-disabled="true"]': 1 },
      [select.child("button")]: { textDecorationLine: "line-through" },
    }),
    mxAutoWFitP0: css({
      marginInline: "auto",
      width: "fit-content",
      padding: { "*": null, base: "0" },
    }),
    p0: css({ padding: { "*": null, base: "0" } }),
  }

  const [date, setDate] = createSignal<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  )
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
  )

  const bookedClass = styleProps(styles.booked).class ?? ""

  return (
    <Example title="Booked Dates" {...rest} class={local.class} sx={[local.sx]}>
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="single"
            defaultMonth={date()}
            selected={date()}
            onSelectedChange={(details: {
              selected: ReturnType<typeof date>
            }) => setDate(details.selected)}
            disabled={bookedDates}
            modifiers={{
              booked: bookedDates,
            }}
            modifiersClassNames={{
              booked: bookedClass,
            }}
          />
        </CardContent>
      </Card>
    </Example>
  )
}
