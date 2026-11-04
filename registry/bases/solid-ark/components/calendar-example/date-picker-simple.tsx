import { createSignal, splitProps } from "solid-js"
import { css } from "@kirana-style/core"
import { format } from "date-fns"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
import { Field, FieldLabel } from "../../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { fontWeight, space, spacing } from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function DatePickerSimple(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const styles = {
    wAutoP0: css({ width: "auto", padding: { "*": null, base: "0" } }),
    w72: css({ marginInline: "auto", width: { "*": null, base: space[72] } }),
    justifyStartPx25FontNorm: css({
      justifyContent: "flex-start",
      paddingInline: { "*": null, base: spacing(2.5) },
      fontWeight: { "*": null, base: fontWeight.normal },
    }),
  }

  const [date, setDate] = createSignal<Date>()

  return (
    <Example
      title="Date Picker Simple"
      {...rest}
      class={local.class}
      sx={[local.sx]}
    >
      <Field sx={styles.w72}>
        <FieldLabel for="date-picker-simple">Date</FieldLabel>
        <Popover>
          <PopoverTrigger
            asChild={(childProps) => (
              <Button
                {...childProps()}
                variant="outline"
                id="date-picker-simple"
                sx={styles.justifyStartPx25FontNorm}
              >
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                  phosphor="CalendarBlankIcon"
                  remixicon="RiCalendarLine"
                  data-icon="inline-start"
                />
                {date() ? format(date()!, "PPP") : <span>Pick a date()</span>}
              </Button>
            )}
          />
          <PopoverContent sx={styles.wAutoP0} align="start">
            <Calendar
              mode="single"
              selected={date()}
              onSelectedChange={(details: {
                selected: ReturnType<typeof date>
              }) => setDate(details.selected)}
            />
          </PopoverContent>
        </Popover>
      </Field>
    </Example>
  )
}
