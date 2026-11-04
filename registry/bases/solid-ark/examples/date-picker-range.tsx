import { createSignal } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { addDays, format } from "date-fns"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { DateRange } from "../ui/calendar"

export default function DatePickerRange() {
  const styles = {
    datePickerWithRangeField: css({
      marginInline: { "*": null, base: "auto" },
      width: { "*": null, base: space[60] },
    }),
    datePickerWithRangeButton: css({
      justifyContent: { "*": null, base: "flex-start" },
      paddingInline: { "*": null, base: space["2.5"] },
      fontWeight: { "*": null, base: fontWeight.normal },
    }),
    datePickerWithRangePopoverContent: css({
      width: { "*": null, base: "auto" },
      padding: { "*": null, base: space["0"] },
    }),
  }

  const [date, setDate] = createSignal<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })

  return (
    <div sx={page.example}>
      <Field sx={styles.datePickerWithRangeField}>
        <FieldLabel for="date-picker-range">Date Picker Range</FieldLabel>
        <Popover>
          <PopoverTrigger
            asChild={(props) => (
              <Button
                {...props()}
                variant="outline"
                labelText={false}
                id="date-picker-range"
                sx={styles.datePickerWithRangeButton}
              >
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                  phosphor="CalendarIcon"
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
          <PopoverContent
            sx={styles.datePickerWithRangePopoverContent}
            align="start"
          >
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
    </div>
  )
}
