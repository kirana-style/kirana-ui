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
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
}

export default function DatePickerSimple() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<CalendarDate | null>(null)

  return (
    <div sx={page.example}>
      <Field sx={styles.datePickerSimpleField}>
        <FieldLabel htmlFor="date">Date of birth</FieldLabel>
        <PopoverTrigger isOpen={open} onOpenChange={setOpen}>
          <Button
            variant="outline"
            id="date"
            sx={styles.datePickerSimpleButton}
          >
            {date
              ? date.toDate(getLocalTimeZone()).toLocaleDateString()
              : "Select date"}
          </Button>
          <Popover sx={styles.datePickerSimplePopover} placement="bottom start">
            <Calendar
              value={date}
              captionLayout="dropdown"
              onChange={(selected) => {
                setDate(selected)
                setOpen(false)
              }}
            />
          </Popover>
        </PopoverTrigger>
      </Field>
    </div>
  )
}
