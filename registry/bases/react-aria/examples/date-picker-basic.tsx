import * as React from "react"
import { getLocalTimeZone } from "@internationalized/date"
import type { CalendarDate } from "@internationalized/date"

import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import { Popover, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  datePickerSimpleField: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: space[44] },
  }),
  datePickerSimpleButton: css({
    justifyContent: { "*": null, base: "flex-start" },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  datePickerSimplePopover: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

export default function DatePickerSimple() {
  const [date, setDate] = React.useState<CalendarDate | null>(null)

  return (
    <div sx={page.example}>
      <Field sx={styles.datePickerSimpleField}>
        <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
        <PopoverTrigger>
          <Button
            variant="outline"
            id="date-picker-simple"
            sx={styles.datePickerSimpleButton}
          >
            {date ? (
              date
                .toDate(getLocalTimeZone())
                .toLocaleDateString(undefined, { dateStyle: "long" })
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
          <Popover sx={styles.datePickerSimplePopover} placement="bottom start">
            <Calendar value={date} onChange={setDate} />
          </Popover>
        </PopoverTrigger>
      </Field>
    </div>
  )
}
