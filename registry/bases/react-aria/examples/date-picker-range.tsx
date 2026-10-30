import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { CalendarDate, getLocalTimeZone } from "@internationalized/date"
import type { DateRange } from "react-aria-components"

import { Button } from "../ui/button"
import { RangeCalendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import { Popover, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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
  datePickerWithRangePopover: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

export default function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>(() => ({
    start: new CalendarDate(new Date().getFullYear(), 1, 20),
    end: new CalendarDate(new Date().getFullYear(), 1, 20).add({ days: 20 }),
  }))

  return (
    <div sx={page.example}>
      <Field sx={styles.datePickerWithRangeField}>
        <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
        <PopoverTrigger>
          <Button
            variant="outline"
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
            {date?.start && date.end ? (
              // The browser's locale and ICU format the range, which the prerendered page cannot know.
              <span suppressHydrationWarning>
                {new Intl.DateTimeFormat(undefined, {
                  dateStyle: "long",
                }).formatRange(
                  date.start.toDate(getLocalTimeZone()),
                  date.end.toDate(getLocalTimeZone())
                )}
              </span>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
          <Popover
            sx={styles.datePickerWithRangePopover}
            placement="bottom start"
          >
            <RangeCalendar value={date} onChange={setDate} numberOfMonths={2} />
          </Popover>
        </PopoverTrigger>
      </Field>
    </div>
  )
}
