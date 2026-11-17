import * as React from "react"

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
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
}

export default function DatePickerSimple() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div sx={page.example}>
      <Field sx={styles.datePickerSimpleField}>
        <FieldLabel htmlFor="date">Date of birth</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date"
                sx={styles.datePickerSimpleButton}
              />
            }
          >
            {date ? date.toLocaleDateString() : "Select date"}
          </PopoverTrigger>
          <PopoverContent
            sx={styles.datePickerSimplePopoverContent}
            align="start"
          >
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date}
              captionLayout="dropdown"
              onSelect={(selected) => {
                setDate(selected)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
    </div>
  )
}
