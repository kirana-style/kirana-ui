import { createSignal, splitProps } from "solid-js"
import { css } from "@kirana-style/core"
import { Example } from "../../components/example"
import { Calendar } from "../../ui/calendar"
import { Card, CardContent } from "../../ui/card"
import type { Sx } from "@kirana-style/core"

export function CalendarSingle(props: {
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
  }

  const [date, setDate] = createSignal<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )

  return (
    <Example title="Single" {...rest} class={local.class} sx={[local.sx]}>
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="single"
            selected={date()}
            onSelectedChange={(details: {
              selected: ReturnType<typeof date>
            }) => setDate(details.selected)}
            captionLayout="dropdown"
          />
        </CardContent>
      </Card>
    </Example>
  )
}
