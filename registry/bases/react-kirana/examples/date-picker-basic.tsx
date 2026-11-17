import * as React from "react"
import { format } from "date-fns"

import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
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
  datePickerSimplePopoverContent: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

export default function DatePickerSimple() {
  const [date, setDate] = React.useState<Date>()

  return (
    <div sx={page.example}>
      <Field sx={styles.datePickerSimpleField}>
        <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date-picker-simple"
                sx={styles.datePickerSimpleButton}
              />
            }
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </PopoverTrigger>
          <PopoverContent
            sx={styles.datePickerSimplePopoverContent}
            align="start"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
            />
          </PopoverContent>
        </Popover>
      </Field>
    </div>
  )
}
