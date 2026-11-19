import { createSignal, splitProps } from "solid-js"
import { css } from "@kirana-style/core"
import { addDays, format } from "date-fns"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
import { Field, FieldLabel } from "../../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { fontWeight, space, spacing } from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"
import type { DateRange } from "../../ui/calendar"

export function DatePickerWithRange(props: {
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

  const [date, setDate] = createSignal<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })

  return (
    <Example
      title="Date Picker Range"
      {...rest}
      class={local.class}
      sx={[local.sx]}
    >
      <Field sx={styles.w72}>
        <FieldLabel for="date-picker-range">Date Picker Range</FieldLabel>
        <Popover>
          <PopoverTrigger
            asChild={(childProps) => (
              <Button
                {...childProps()}
                variant="outline"
                labelText={false}
                id="date-picker-range"
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
                {date()?.from ? (
                  <>
                    {date()!.to ? (
                      <>
                        {format(date()!.from!, "LLL dd, y")} -{" "}
                        {format(date()!.to!, "LLL dd, y")}
                      </>
                    ) : (
                      format(date()!.from!, "LLL dd, y")
                    )}
                  </>
                ) : (
                  <span>Pick a date()</span>
                )}
              </Button>
            )}
          />
          <PopoverContent sx={styles.wAutoP0} align="start">
            <Calendar
              mode="range"
              defaultMonth={date()?.from}
              selected={date()}
              onSelectedChange={(details: {
                selected: ReturnType<typeof date>
              }) => setDate(details.selected)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </Field>
    </Example>
  )
}
