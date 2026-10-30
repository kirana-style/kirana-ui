import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { getLocalTimeZone } from "@internationalized/date"
import type { CalendarDate } from "@internationalized/date"

import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Popover, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  fieldGroup: css({
    marginInline: { "*": null, base: "auto" },
    maxWidth: { "*": null, base: containerSize.xs },
    flexDirection: { "*": null, base: "row" },
  }),
  button: css({
    width: { "*": null, base: space[32] },
    justifyContent: { "*": null, base: "space-between" },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  popover: css({
    width: { "*": null, base: "auto" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
  field: css({
    width: { "*": null, base: space[32] },
  }),
  input: css({
    appearance: { "*": null, base: "none" },
    backgroundColor: theme.background,
    "::-webkit-calendar-picker-indicator": {
      display: "none",
      appearance: "none",
    },
  }),
}

export default function DatePickerTime() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<CalendarDate | undefined>(undefined)

  return (
    <div sx={page.example}>
      <FieldGroup sx={styles.fieldGroup}>
        <Field>
          <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
          <PopoverTrigger isOpen={open} onOpenChange={setOpen}>
            <Button
              variant="outline"
              id="date-picker-optional"
              sx={styles.button}
            >
              {date
                ? date.toDate(getLocalTimeZone()).toLocaleDateString()
                : "Select date"}
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                data-icon="inline-end"
              />
            </Button>
            <Popover sx={styles.popover} placement="bottom start">
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
        <Field sx={styles.field}>
          <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
          <Input
            type="time"
            id="time-picker-optional"
            step="1"
            defaultValue="10:30:00"
            sx={styles.input}
          />
        </Field>
      </FieldGroup>
    </div>
  )
}
